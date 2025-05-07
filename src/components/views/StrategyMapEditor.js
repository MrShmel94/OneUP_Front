import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import axiosInstance from '../../lib/axios';
import { useLoader } from '../../context/LoaderContext';
import Swal from 'sweetalert2';

const MAPS = [
  { 
    id: 'row_map',
    name: 'ROW Map',
    src: '/images/additional/row_map.png'
  },
  { 
    id: 'desert_map',
    name: 'Desert Map',
    src: '/images/additional/desert_map.png'
  },
  { 
    id: 'forest_map',
    name: 'Forest Map',
    src: 'https://placehold.co/800x450/228B22/FFFFFF?text=Forest+Map'
  }
];

const ICONS = [
  { type: 'Marksman', src: '/images/additional/Marksman.png' },
  { type: 'Infantry', src: '/images/additional/Infantry.png' },
  { type: 'Cavalry', src: '/images/additional/Cavalry.png' },
  { type: 'Mage', src: '/images/additional/Mage.png' },
  { type: 'Rally', src: '/images/additional/Rally.png' },
  { type: 'Marksman_enemy', src: '/images/additional/Marksman_enemy.png' },
  { type: 'Infantry_enemy', src: '/images/additional/Infantry_enemy.png' },
  { type: 'Cavalry_enemy', src: '/images/additional/Cavalry_enemy.png' },
  { type: 'Mage_enemy', src: '/images/additional/Mage_enemy.png' },
  { type: 'Rally_enemy', src: '/images/additional/Rally_enemy.png' },
];

function percentToPx(percent, size) {
  return percent * size;
}
function pxToPercent(px, size) {
  return px / size;
}

function getCurrentIcons(actions) {
  const icons = {};
  actions.forEach(action => {
    if (action.type === 'add') {
      icons[action.iconId] = {
        iconId: action.iconId,
        type: action.iconType,
        src: action.iconSrc,
        x: action.x,
        y: action.y
      };
    } else if (action.type === 'move' && icons[action.iconId]) {
      icons[action.iconId] = {
        ...icons[action.iconId],
        x: action.x,
        y: action.y
      };
    } else if (action.type === 'remove') {
      delete icons[action.iconId];
    }
  });
  return Object.values(icons);
}

export default function StrategyMapEditor() {
  const mapRef = useRef(null);
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [actions, setActions] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [draggedId, setDraggedId] = useState(null);
  const draggedIdRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [iconIdCounter, setIconIdCounter] = useState(1);
  const [dragLine, setDragLine] = useState(null);
  const [editablePath, setEditablePath] = useState(null);
  const [paths, setPaths] = useState({});
  const [pathIdCounter, setPathIdCounter] = useState(1);
  const [textIdCounter, setTextIdCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [planName, setPlanName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { setIsLoading: setGlobalLoading } = useLoader();
  const [textMenuIconId, setTextMenuIconId] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);

  const icons = useMemo(() => getCurrentIcons(actions), [actions]);

  useEffect(() => {
    if (selectedMap) {
      loadPlans(selectedMap.id);
    }
  }, [selectedMap]);

  const loadPlans = async (mapId) => {
    setGlobalLoading(true);
    try {
      const response = await axiosInstance.get(`/api/guild/getPlan/${mapId}`);
      setPlans(response.data);
    } catch (error) {
      console.error('Failed to load plans:', error);
      setPlans([]);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load plans',
        confirmButtonColor: '#3B82F6'
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  const loadPlanData = async (plan) => {
    setGlobalLoading(true);
    try {
      const decompressedData = await decompressData(plan.rowData);
      setActions(decompressedData);
      setSelectedPlan(plan);

      let maxIconId = 0;
      let maxPathNum = 0;
      let maxTextNum = 0;

      decompressedData.forEach(action => {
        if (action.iconId && action.iconId > maxIconId) {
          maxIconId = action.iconId;
        }
        if (action.pathId) {
          const num = parseInt(action.pathId.split('_').pop(), 10);
          if (!isNaN(num) && num > maxPathNum) {
            maxPathNum = num;
          }
        }
        if (action.textId) {
          const num = parseInt(action.textId.split('_').pop(), 10);
          if (!isNaN(num) && num > maxTextNum) {
            maxTextNum = num;
          }
        }
      });

      setIconIdCounter(maxIconId + 1);
      setPathIdCounter(maxPathNum + 1);
      setTextIdCounter(maxTextNum + 1);

    } catch (error) {
      console.error('Failed to load plan data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load plan data',
        confirmButtonColor: '#3B82F6'
      });
    } finally {
      setGlobalLoading(false);
    }
  };  

  const savePlan = async () => {
    if (!selectedMap || !planName.trim()) return;
    
    setGlobalLoading(true);
    try {
      const compressedData = await compressData(actions);
      
      await axiosInstance.post('/api/guild/savePlan', {
        nameMap: selectedMap.id,
        name: planName.trim(),
        rowData: compressedData
      });

      await loadPlans(selectedMap.id);
      setShowSaveDialog(false);
      setPlanName('');
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Plan saved successfully!',
        confirmButtonColor: '#3B82F6'
      });
    } catch (error) {
      console.error('Failed to save plan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save plan',
        confirmButtonColor: '#3B82F6'
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  const compressData = async (data) => {
    const jsonString = JSON.stringify(data);
    const compressed = await import('pako').then(pako => 
      pako.deflate(jsonString, { level: 9 })
    );
    return btoa(String.fromCharCode.apply(null, compressed));
  };

  const decompressData = async (compressed) => {
    const compressedData = Uint8Array.from(atob(compressed), c => c.charCodeAt(0));
    const decompressed = await import('pako').then(pako => 
      pako.inflate(compressedData, { to: 'string' })
    );
    return JSON.parse(decompressed);
  };

  const handleMapClick = (e) => {
    if (!selectedIcon) return;
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = pxToPercent(e.clientX - rect.left, rect.width);
    const y = pxToPercent(e.clientY - rect.top, rect.height);
    const newId = iconIdCounter;
    setActions(actions => [
      ...actions,
      {
        type: 'add',
        iconId: newId,
        iconType: selectedIcon.type,
        iconSrc: selectedIcon.src,
        x, y
      }
    ]);
    setIconIdCounter(id => id + 1);
    setSelectedIcon(null);
  };

  const handleMouseDown = (iconId, e) => {
    e.stopPropagation();
    if (!mapRef.current) return;
    setDraggedId(iconId);
    draggedIdRef.current = iconId;
    const rect = mapRef.current.getBoundingClientRect();
    const icon = icons.find(i => i.iconId === iconId);
    if (!icon || isNaN(icon.x) || isNaN(icon.y)) return;
    dragOffsetRef.current = {
      x: e.clientX - (rect.left + percentToPx(icon.x, rect.width)),
      y: e.clientY - (rect.top + percentToPx(icon.y, rect.height))
    };
    setDragLine({
      from: { x: icon.x, y: icon.y },
      to: { x: icon.x, y: icon.y }
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const id = draggedIdRef.current;
    if (id === null || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = pxToPercent(e.clientX - rect.left - dragOffsetRef.current.x, rect.width);
    const y = pxToPercent(e.clientY - rect.top - dragOffsetRef.current.y, rect.height);
    setDragLine(line => line ? { ...line, to: { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) } } : null);
  };

  const handleMouseUp = (e) => {
    const id = draggedIdRef.current;
    if (id === null || !mapRef.current) {
      cleanupDrag();
      return;
    }
    const rect = mapRef.current.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      cleanupDrag();
      return;
    }
    const x = pxToPercent(e.clientX - rect.left - dragOffsetRef.current.x, rect.width);
    const y = pxToPercent(e.clientY - rect.top - dragOffsetRef.current.y, rect.height);
    
    const tempMove = { type: 'move', iconId: id, x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
    
    setEditablePath({
      iconId: id,
      points: [
        { x: icons.find(i => i.iconId === id).x, y: icons.find(i => i.iconId === id).y },
        { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) }
      ],
      tempMove 
    });
    
    cleanupDrag();
  };

  function cleanupDrag() {
    setDraggedId(null);
    draggedIdRef.current = null;
    setDragLine(null);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  const removeIcon = (iconId) => {
    setActions(actions => ([...actions, { type: 'remove', iconId }]));
  };

  const removeAction = (idx) => {
    setActions(actions => {
      const action = actions[idx];
      if (action.type === 'path') {
        const nextMoveIdx = actions.findIndex((a, i) => i > idx && a.type === 'move' && a.iconId === action.iconId);
        const newActions = actions.filter((_, i) => i !== idx && i !== nextMoveIdx);
        return newActions;
      }
      return actions.filter((_, i) => i !== idx);
    });
  };

  function renderDragLine() {
    if (!dragLine || !mapRef.current) return null;
    const rect = mapRef.current.getBoundingClientRect();
    const x1 = percentToPx(dragLine.from.x, rect.width);
    const y1 = percentToPx(dragLine.from.y, rect.height);
    const x2 = percentToPx(dragLine.to.x, rect.width);
    const y2 = percentToPx(dragLine.to.y, rect.height);
    return (
      <svg style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }} width={rect.width} height={rect.height}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e90ff" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arrowhead)" />
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 10 3.5, 0 7" fill="#1e90ff" />
          </marker>
        </defs>
      </svg>
    );
  }

  function EditablePath({ path, onChange, onConfirm, onDelete, onDeletePoint }) {
    const mapRect = mapRef.current?.getBoundingClientRect();
    if (!mapRect) return null;
    const pointsStr = path.points.map(p => `${percentToPx(p.x, mapRect.width)},${percentToPx(p.y, mapRect.height)}`).join(' ');
    return (
      <svg style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'auto' }} width={mapRect.width} height={mapRect.height}>
        <polyline points={pointsStr} fill="none" stroke="#1e90ff" strokeWidth="3" strokeDasharray="8 6" pointerEvents="stroke" />
        <polyline
          points={pointsStr}
          fill="none"
          stroke="transparent"
          strokeWidth="20"
          style={{ cursor: 'copy' }}
          pointerEvents="stroke"
          onClick={e => {
            const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
            const x = pxToPercent(e.clientX - rect.left, mapRect.width);
            const y = pxToPercent(e.clientY - rect.top, mapRect.height);
            let minDist = Infinity, insertIdx = 1;
            for (let i = 0; i < path.points.length - 1; ++i) {
              const ax = path.points[i].x, ay = path.points[i].y;
              const bx = path.points[i+1].x, by = path.points[i+1].y;
              const t = Math.max(0, Math.min(1, ((x-ax)*(bx-ax)+(y-ay)*(by-ay))/((bx-ax)**2+(by-ay)**2)));
              const px = ax + t*(bx-ax), py = ay + t*(by-ay);
              const dist = Math.hypot(px-x, py-y);
              if (dist < minDist) { minDist = dist; insertIdx = i+1; }
            }
            const newPoints = [...path.points];
            newPoints.splice(insertIdx, 0, { x, y });
            onChange({ ...path, points: newPoints });
          }}
        />
        {path.points.map((p, idx) => (
          <circle
            key={idx}
            cx={percentToPx(p.x, mapRect.width)}
            cy={percentToPx(p.y, mapRect.height)}
            r={idx === 0 || idx === path.points.length - 1 ? 8 : 6}
            fill={idx === 0 ? '#4ade80' : idx === path.points.length - 1 ? '#fbbf24' : '#1e90ff'}
            style={{ cursor: 'pointer' }}
            onMouseDown={e => startDragPoint(idx, e)}
          />
        ))}
      </svg>
    );
  }

  const [draggedPointIdx, setDraggedPointIdx] = useState(null);
  const draggedPointIdxRef = useRef(null);
  const startDragPoint = (idx, e) => {
    e.stopPropagation();
    setDraggedPointIdx(idx);
    draggedPointIdxRef.current = idx;
    window.addEventListener('mousemove', dragPointMove);
    window.addEventListener('mouseup', dragPointUp);
  };
  const dragPointMove = useCallback((e) => {
    if (editablePath && draggedPointIdxRef.current !== null && mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const x = pxToPercent(e.clientX - rect.left, rect.width);
      const y = pxToPercent(e.clientY - rect.top, rect.height);
      const newPoints = editablePath.points.map((p, i) => i === draggedPointIdxRef.current ? { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) } : p);
      setEditablePath({ ...editablePath, points: newPoints });
    }
  }, [editablePath]);
  const dragPointUp = useCallback(() => {
    setDraggedPointIdx(null);
    draggedPointIdxRef.current = null;
    window.removeEventListener('mousemove', dragPointMove);
    window.removeEventListener('mouseup', dragPointUp);
  }, [dragPointMove]);

  const onDeletePoint = (idx) => {
    if (!editablePath) return;
    const newPoints = editablePath.points.filter((_, i) => i !== idx);
    setEditablePath({ ...editablePath, points: newPoints });
  };

  const confirmPath = () => {
    if (editablePath) {
      setActions(actions => {
        if (editablePath.pathId) {
          const idx = actions.findIndex(a => a.type === 'path' && a.pathId === editablePath.pathId);
          if (idx !== -1) {
            const newActions = [...actions];
            newActions[idx] = { ...actions[idx], points: editablePath.points };
            return newActions;
          }
        }
        const newPathId = `path_${editablePath.iconId}_${pathIdCounter}`;
        setPathIdCounter(c => c + 1);
        
        const newActions = [...actions];
        newActions.push({ 
          type: 'path', 
          iconId: editablePath.iconId, 
          pathId: newPathId, 
          points: editablePath.points 
        });
        if (editablePath.tempMove) {
          newActions.push(editablePath.tempMove);
        }
        return newActions;
      });
      setEditablePath(null);
    }
  };

  const deletePath = () => {
    if (editablePath) {
      setEditablePath(null);
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [playIcons, setPlayIcons] = useState([]);
  const [hiddenDuringPlay, setHiddenDuringPlay] = useState(false);

  const playAnimation = async () => {
    setIsPlaying(true);
    setHiddenDuringPlay(true);

    const iconDataMap = {};
    actions.forEach(action => {
      if (action.type === 'add') {
        iconDataMap[action.iconId] = {
          addAction: action,
          lastMoveAction: action,
          pathActions: []
        };
      } else if (action.type === 'move' && iconDataMap[action.iconId]) {
        iconDataMap[action.iconId].lastMoveAction = action;
      } else if (action.type === 'path' && iconDataMap[action.iconId]) {
        iconDataMap[action.iconId].pathActions.push(action);
      } else if (action.type === 'remove' && iconDataMap[action.iconId]) {
        delete iconDataMap[action.iconId];
      }
    });

    const iconsToProcess = Object.values(iconDataMap).map(data => {
      const baseIcon = {
        iconId: data.addAction.iconId,
        type: data.addAction.iconType,
        src: data.addAction.iconSrc,
      };
      if (data.pathActions.length > 0) {
        return { ...baseIcon, x: data.addAction.x, y: data.addAction.y, paths: data.pathActions };
      } else {
        return { ...baseIcon, x: data.lastMoveAction.x, y: data.lastMoveAction.y, paths: [] };
      }
    });

    setPlayIcons(iconsToProcess.map(icon => ({ iconId: icon.iconId, type: icon.type, src: icon.src, x: icon.x, y: icon.y })));

    const animationPromises = iconsToProcess
      .filter(icon => icon.paths.length > 0)
      .map(iconData => animateIconThroughPaths(iconData));

    await Promise.all(animationPromises);

    setIsPlaying(false);
    setHiddenDuringPlay(false);
  };

  async function animateIconThroughPaths(iconData) {
    let currentX = iconData.x;
    let currentY = iconData.y;

    for (const pathAction of iconData.paths) {
      await animateSinglePathSegment(iconData.iconId, currentX, currentY, pathAction.points);
      if (pathAction.points.length > 0) {
        const lastPoint = pathAction.points[pathAction.points.length - 1];
        currentX = lastPoint.x;
        currentY = lastPoint.y;
      }
    }
  }

  async function animateSinglePathSegment(iconId, fromX, fromY, pointsArray) {
    let currentSegmentX = fromX;
    let currentSegmentY = fromY;

    for (const targetPoint of pointsArray) {
      const toX = targetPoint.x;
      const toY = targetPoint.y;

      await new Promise(resolve => {
        const duration = 500;
        const startTime = performance.now();
        
        const animationFrame = (now) => {
          const t = Math.min(1, (now - startTime) / duration);
          const newX = currentSegmentX + (toX - currentSegmentX) * t;
          const newY = currentSegmentY + (toY - currentSegmentY) * t;

          setPlayIcons(prevPlayIcons =>
            prevPlayIcons.map(pIcon =>
              pIcon.iconId === iconId ? { ...pIcon, x: newX, y: newY } : pIcon
            )
          );

          if (t < 1) {
            requestAnimationFrame(animationFrame);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(animationFrame);
      });
      currentSegmentX = toX;
      currentSegmentY = toY;
    }
  }

  const getTextForIconAtStage = (iconId, currentPathIndex) => {
    const pathActions = actions.filter(a => a.type === 'path' && a.iconId === iconId);
    
    const textActions = actions.filter(a => a.type === 'text' && a.iconId === iconId);
    if (textActions.length === 0) return null;

    if (pathActions.length === 0) {
      return textActions[textActions.length - 1];
    }

    const currentPath = pathActions[currentPathIndex];
    if (!currentPath) return textActions[textActions.length - 1];

    const currentPathActionIndex = actions.findIndex(a => 
      a.type === 'path' && 
      a.iconId === iconId && 
      a.pathId === currentPath.pathId
    );

    let lastTextAction = null;
    for (let i = 0; i < actions.length; i++) {
      if (actions[i].type === 'text' && actions[i].iconId === iconId) {
        lastTextAction = actions[i];
      }
      if (i === currentPathActionIndex) {
        break;
      }
    }

    return lastTextAction || textActions[textActions.length - 1];
  };

  const [mapSize, setMapSize] = useState({ width: 800, height: 450 });
  useEffect(() => {
    function updateSize() {
      const vw = Math.min(window.innerWidth * 0.9, 1200);
      const vh = Math.min(window.innerHeight * 0.8, 675);
      let width = vw, height = vw * 9 / 16;
      if (height > vh) {
        height = vh;
        width = vh * 16 / 9;
      }
      setMapSize({ width, height });
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  const iconSize = Math.max(32, Math.round(mapSize.width * 0.048));

  const [iconLabels, setIconLabels] = useState({});

  const addTextAction = (iconId, text) => {
    setActions(actions => [...actions, { type: 'text', iconId, text }]);
  };

  const getLastTextForIcon = (iconId) => {
    for (let i = actions.length - 1; i >= 0; i--) {
      if (actions[i].type === 'text' && actions[i].iconId === iconId) {
        return actions[i].text;
      }
    }
    return '';
  };

  const handleTextChange = (iconId, text) => {
    setIconLabels(prev => ({ ...prev, [iconId]: text }));
  };

  const handleTextBlur = (iconId, text) => {
    if (text !== getLastTextForIcon(iconId)) {
      setActions(actions => {
        let insertIdx = -1;
        for (let i = actions.length - 1; i >= 0; i--) {
          if ((actions[i].type === 'move' || actions[i].type === 'path') && actions[i].iconId === iconId) {
            insertIdx = i;
            break;
          }
        }
        
        const newTextId = `text_${iconId}_${textIdCounter}`;
        setTextIdCounter(c => c + 1);
        
        const newActions = [...actions];
        if (insertIdx !== -1) {
          newActions.splice(insertIdx + 1, 0, { 
            type: 'text', 
            iconId, 
            text,
            textId: newTextId
          });
        } else {
          newActions.push({ 
            type: 'text', 
            iconId, 
            text,
            textId: newTextId
          });
        }
        return newActions;
      });
    }
  };

  const adjustTextareaSize = (element) => {
    if (!element) return;
    
    element.style.height = 'auto';
    element.style.width = 'auto';
    
    const temp = document.createElement('div');
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.whiteSpace = 'pre-wrap';
    temp.style.wordWrap = 'break-word';
    temp.style.width = 'auto';
    temp.style.padding = '4px 8px';
    temp.style.fontSize = '12px';
    temp.style.lineHeight = '1.2';
    temp.style.fontFamily = 'inherit';
    temp.style.letterSpacing = '0.5px';
    temp.innerText = element.value + ' ';
    document.body.appendChild(temp);
    
    const width = Math.min(Math.max(temp.offsetWidth + 2, iconSize), 300);
    const height = Math.min(temp.offsetHeight + 2, 150);
    
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    
    document.body.removeChild(temp);
  };

  const textareaRefs = useRef({});

  const updateTextareaPosition = useCallback((iconId, x, y) => {
    const textarea = textareaRefs.current[iconId];
    if (textarea) {
      textarea.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, []);

  useEffect(() => {
    if (draggedId && dragLine && mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const x = percentToPx(dragLine.to.x, rect.width) - iconSize / 2;
      const y = percentToPx(dragLine.to.y, rect.height) - iconSize / 2;
      updateTextareaPosition(draggedId, x, y);
    }
  }, [dragLine, draggedId, updateTextareaPosition]);

  useEffect(() => {
    const labels = {};
    actions.forEach(action => {
      if (action.type === 'text') {
        labels[action.iconId] = action.text;
      }
    });
    setIconLabels(labels);
  }, []);

  useEffect(() => {
    if (isPlaying && playIcons.length > 0 && mapRef.current) {
      playIcons.forEach(icon => {
        const rect = mapRef.current.getBoundingClientRect();
        const posX = percentToPx(icon.x, rect.width) - iconSize / 2;
        const posY = percentToPx(icon.y, rect.height) - iconSize / 2;
        updateTextareaPosition(icon.iconId, posX, posY);
      });
    }
  }, [isPlaying, playIcons, updateTextareaPosition]);

  function measureTextSize(text, iconSize) {
    const temp = document.createElement('div');
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.whiteSpace = 'pre-wrap';
    temp.style.wordWrap = 'break-word';
    temp.style.width = 'auto';
    temp.style.padding = '4px 8px';
    temp.style.fontSize = '12px';
    temp.style.lineHeight = '1.2';
    temp.style.fontFamily = 'inherit';
    temp.style.letterSpacing = '0.5px';
    temp.innerText = text + ' ';
    document.body.appendChild(temp);
    const width = Math.min(Math.max(temp.offsetWidth + 2, iconSize), 300);
    const height = Math.min(temp.offsetHeight + 2, 150);
    document.body.removeChild(temp);
    return { width, height };
  }

  const removeTextForIcon = (iconId) => {
    setActions(actions => actions.filter(a => !(a.type === 'text' && a.iconId === iconId)));
    setIconLabels(prev => ({ ...prev, [iconId]: undefined }));
    setTextMenuIconId(null);
  };

  const confirmAddText = (iconId) => {
    if (textInputValue.trim()) {
      setActions(actions => [...actions, { type: 'text', iconId, text: textInputValue.trim() }]);
      setIconLabels(prev => ({ ...prev, [iconId]: textInputValue.trim() }));
    }
    setTextMenuIconId(null);
    setTextInputValue('');
  };

  function handleIconMouseDown(iconId, e) {
    e.stopPropagation();
    dragMovedRef.current = false;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    function onMove(ev) {
      if (!dragMovedRef.current) {
        const dx = Math.abs(ev.clientX - dragStartPosRef.current.x);
        const dy = Math.abs(ev.clientY - dragStartPosRef.current.y);
        if (dx > 3 || dy > 3) {
          dragMovedRef.current = true;
          handleMouseDown(iconId, e);
        }
      }
    }
    function onUp(ev) {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (!dragMovedRef.current) {
        setTextMenuIconId(iconId === textMenuIconId ? null : iconId);
        setTextInputValue(iconLabels[iconId] || '');
      }
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  if (!selectedMap) {
    return (
      <div className="min-h-[600px] bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Select a Map</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MAPS.map(map => (
            <button
              key={map.id}
              onClick={() => setSelectedMap(map)}
              className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={map.src} 
                  alt={map.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white text-lg font-medium">{map.name}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
  return (
      <div className="min-h-[600px] bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Select or Create a Plan</h2>
          <button
            onClick={() => setSelectedMap(null)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Maps
          </button>
        </div>
        <div className="w-full max-w-2xl mx-auto">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading plans...</div>
          ) : plans.length > 0 ? (
            <div className="space-y-6">
              <h3 className="font-medium text-lg text-gray-700">Existing Plans:</h3>
              <div className="grid gap-4">
                {plans.map(plan => (
                  <button
                    key={plan.name}
                    onClick={() => loadPlanData(plan)}
                    className="w-full p-4 text-left bg-white border rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-lg text-gray-900">{plan.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Created by {plan.nameCreator} on {new Date(plan.dateCreate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
          </button>
        ))}
      </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">No plans found for this map</div>
          )}
          <div className="mt-8">
            <button
              onClick={() => setSelectedPlan({ name: 'New Plan' })}
              className="w-full p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 grid grid-rows-[1fr_auto]">
      <div className="flex flex-col h-full">
        <div className="flex flex-wrap gap-2 mb-2 justify-center mt-4">
          {ICONS.map(icon => (
            <button
              key={icon.type}
              className={`border rounded p-1 ${selectedIcon?.type === icon.type ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => setSelectedIcon(icon)}
            >
              <img src={icon.src} alt={icon.type} className="w-8 h-8" draggable={false} />
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-center min-h-0">
      <div
        ref={mapRef}
            className="relative w-full h-full max-w-full max-h-full bg-gray-200 rounded-xl shadow-lg overflow-hidden flex items-center justify-center"
            style={{ minHeight: 180 }}
        onClick={handleMapClick}
          >
            <img
              src={selectedMap.src}
              alt="map"
              className="w-full h-full object-contain absolute inset-0 select-none pointer-events-none"
              draggable={false}
            />
            {!hiddenDuringPlay && icons.map((icon) => {
              if (draggedId === icon.iconId && dragLine) return null;
              const textValue = iconLabels[icon.iconId] || '';
              return (
                <div
                  key={icon.iconId}
            style={{
              position: 'absolute',
              left: `calc(${icon.x * 100}% - 24px)`,
              top: `calc(${icon.y * 100}% - 24px)`,
              zIndex: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 48,
                  }}
                  onMouseDown={e => handleIconMouseDown(icon.iconId, e)}
                >
                  <img src={icon.src} alt={icon.type} style={{ width: 48, height: 48 }} className="drop-shadow-lg" draggable={false} />
                  {textMenuIconId === icon.iconId && (
                    <div
                      className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white rounded shadow-lg p-2 z-50 min-w-[160px] flex flex-col gap-2"
                      onMouseDown={e => e.stopPropagation()}
                      onClick={e => e.stopPropagation()}
                    >
                      {textValue ? (
                        <>
                          <div className="text-xs text-gray-700 mb-1">Text: <span className="font-medium">{textValue}</span></div>
                          <button
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                            onClick={() => removeTextForIcon(icon.iconId)}
                          >Hide text</button>
                        </>
                      ) : (
                        <>
                          <textarea
                            className="w-full p-1 border rounded text-xs mb-1"
                            rows={2}
                            value={textInputValue}
                            onChange={e => setTextInputValue(e.target.value)}
                            placeholder="Write text here..."
                            autoFocus
                          />
                          <button
                            type="button"
                            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => confirmAddText(icon.iconId)}
                          >Add text</button>
                        </>
                      )}
                    </div>
                  )}
                  {textValue && textMenuIconId !== icon.iconId && (
                    <div className="mt-1 px-2 py-1 bg-white/80 rounded text-xs text-gray-800 text-center shadow max-w-[180px] break-words">
                      {textValue}
                    </div>
                  )}
                </div>
              );
            })}
            {draggedId && dragLine && (() => {
              const icon = icons.find(i => i.iconId === draggedId);
              if (!icon) return null;
              const rect = mapRef.current.getBoundingClientRect();
              const x = percentToPx(dragLine.to.x, rect.width);
              const y = percentToPx(dragLine.to.y, rect.height);
              return (
                <div
                  style={{
                    position: 'absolute',
                    left: x - 24,
                    top: y - 24,
                    zIndex: 10,
                    pointerEvents: 'none',
                    opacity: 0.85
                  }}
          >
            <img src={icon.src} alt={icon.type} className="w-12 h-12 drop-shadow-lg" draggable={false} />
                </div>
              );
            })()}
            {renderDragLine()}
            {editablePath && (
              <EditablePath
                path={editablePath}
                onChange={setEditablePath}
                onConfirm={confirmPath}
                onDelete={() => setEditablePath(null)}
                onDeletePoint={onDeletePoint}
              />
            )}
            {editablePath && (
              <div style={{ position: 'absolute', left: 10, bottom: 10, zIndex: 20 }}>
                <button onClick={confirmPath} className="px-3 py-1 bg-green-500 text-white rounded mr-2">Confirm Path</button>
                <button onClick={deletePath} className="px-3 py-1 bg-red-500 text-white rounded">Delete Path</button>
              </div>
            )}
            {isPlaying && playIcons.map(icon => {
              const iconPaths = actions.filter(a => a.type === 'path' && a.iconId === icon.iconId);
              const currentPathIdx = iconPaths.findIndex(p => p.points[0].x === icon.x && p.points[0].y === icon.y);
              const textAction = getTextForIconAtStage(icon.iconId, currentPathIdx);
              const finalTextAction = textAction || actions.slice().reverse().find(a => a.type === 'text' && a.iconId === icon.iconId);
              let textBoxSize = { width: 48, height: 24 };
              if (finalTextAction && finalTextAction.text) {
                textBoxSize = measureTextSize(finalTextAction.text, 48);
              }
              return (
                <div
                  key={icon.iconId}
                  style={{
                    position: 'absolute',
                    left: `calc(${icon.x * 100}% - 24px)`,
                    top: `calc(${icon.y * 100}% - 24px)`,
                    zIndex: 20,
                    pointerEvents: 'none',
                    opacity: 0.9,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <img src={icon.src} alt={icon.type} style={{ width: 48, height: 48 }} className="drop-shadow-lg" draggable={false} />
                  {finalTextAction && finalTextAction.text && (
                    <div 
                      className="mt-1 px-2 py-1 bg-white/80 rounded text-xs text-gray-800 text-center shadow"
                      style={{ 
                        minWidth: 48,
                        maxWidth: '180px',
                        width: textBoxSize.width,
                        height: textBoxSize.height,
                        overflow: 'hidden',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      {finalTextAction.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">Click on the map to add an icon. Drag with mouse. Клик по иконке — добавить/скрыть текст.</div>
      </div>
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 mt-4 h-[30vh] min-h-[120px] max-h-[40vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-900">History</h3>
          <div className="flex gap-2">
            <button onClick={() => setSelectedPlan(null)} className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors">← Back</button>
            <button onClick={playAnimation} disabled={isPlaying} className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors">{isPlaying ? 'Playing...' : 'Play'}</button>
            <button onClick={() => setShowSaveDialog(true)} disabled={isSaving} className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors">{isSaving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
        {isLoading ? (
          <div className="text-gray-400 text-sm">Loading history...</div>
        ) : actions.length === 0 ? (
          <div className="text-gray-400 text-sm">No actions yet</div>
        ) : (
          <ol className="space-y-2">
            {actions.map((action, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs bg-gray-50 p-2 rounded-lg">
                <span className="flex-1">
                  {action.type === 'add' && <span>➕ Add <b>{action.iconType}</b> (id:{action.iconId})</span>}
                  {action.type === 'move' && <span>➡️ Move id:{action.iconId} to ({(action.x*100).toFixed(1)}%, {(action.y*100).toFixed(1)}%)</span>}
                  {action.type === 'remove' && <span>❌ Remove id:{action.iconId}</span>}
                  {action.type === 'text' && <span>📝 Text for id:{action.iconId} (textId:{action.textId}): "{action.text}"</span>}
                  {action.type === 'path' && (
                    <span
                      className="underline cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setEditablePath({ iconId: action.iconId, pathId: action.pathId, points: action.points.map(p => ({ ...p })) });
                      }}
                    >
                      🛣️ Path for id:{action.iconId}-{action.pathId} ({action.points.length} points)
                    </span>
                  )}
                </span>
                <button 
                  onClick={() => removeAction(idx)} 
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Save Plan</h3>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Enter plan name"
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePlan}
                disabled={!planName.trim() || isSaving}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 