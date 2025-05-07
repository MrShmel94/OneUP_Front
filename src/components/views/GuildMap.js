"use client";

import React, { useEffect, useState, useRef } from 'react';
import Globe from 'globe.gl';
import axiosInstance from '../../lib/axios';
import { useLoader } from '../../context/LoaderContext';
import countries from 'world-countries';

function getCountryCoordinatesByName(name) {
  const country = countries.find(c => c.name.common === name);
  if (!country) {
    console.warn(`⚠️ Country not found: "${name}"`);
    return [0, 0];
  }
  return country.latlng || [0, 0];
}

export default function GuildMap() {
  const globeRef = useRef();
  const [members, setMembers] = useState([]);
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/api/guild/member/getAllMembers');
        const groupedMembers = response.data.reduce((acc, member) => {
          if (!acc[member.location]) {
            acc[member.location] = {
              location: member.location,
              coordinates: getCountryCoordinatesByName(member.location),
              members: [],
              timezone: member.timezone
            };
          }
          acc[member.location].members.push(member.nickname);
          return acc;
        }, {});
        
        setMembers(Object.values(groupedMembers));
      } catch (error) {
        console.error('Error fetching guild members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [setIsLoading]);

  useEffect(() => {
    if (!globeRef.current || members.length === 0) return;

    const globe = Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .atmosphereColor('#4299E1')
      .atmosphereAltitude(0.1)
      .pointAltitude(0.1)
      .pointColor(() => '#4299E1')
      .pointsData(members.map(country => ({
        lat: country.coordinates[0],
        lng: country.coordinates[1],
        size: 0.5 + (country.members.length * 0.1),
        color: '#4299E1',
        name: `
          <div style="
            background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
            padding: 1rem;
            border-radius: 0.5rem;
            color: white;
            font-family: system-ui, -apple-system, sans-serif;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            max-width: 300px;
          ">
            <h3 style="
              font-size: 1.25rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
              background: linear-gradient(90deg, #4299E1, #63B3ED);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            ">${country.location}</h3>
            <p style="
              color: #A0AEC0;
              margin-bottom: 0.5rem;
              font-size: 0.875rem;
            ">Timezone: ${country.timezone}</p>
            <div style="
              margin-top: 0.5rem;
              padding-top: 0.5rem;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
            ">
              <p style="
                color: #CBD5E0;
                font-size: 0.875rem;
                margin-bottom: 0.25rem;
              ">Members:</p>
              <div style="
                display: flex;
                flex-wrap: wrap;
                gap: 0.25rem;
              ">
                ${country.members.map(nickname => `
                  <span style="
                    background: rgba(66, 153, 225, 0.1);
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    color: #63B3ED;
                  ">${nickname}</span>
                `).join('')}
              </div>
            </div>
          </div>
        `
      })))
      .pointLabel(country => country.name)
      .width(globeRef.current.offsetWidth)
      .height(globeRef.current.offsetHeight)
      (globeRef.current);

    globe.controls().autoRotate = false;
    globe.controls().enableZoom = true;
    globe.controls().enablePan = true;

    const handleResize = () => {
      globe.width(globeRef.current.offsetWidth)
        .height(globeRef.current.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      globe._destructor();
    };
  }, [members]);

  return (
    <div className="w-full bg-gray-900 rounded-xl p-4 min-h-[75vh] mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Our Guild Map</h2>
      <div 
        ref={globeRef} 
        className="w-full grow h-0 min-h-[75vh] rounded-xl relative"
        style={{ background: 'transparent' }}
      />
    </div>
  );
} 