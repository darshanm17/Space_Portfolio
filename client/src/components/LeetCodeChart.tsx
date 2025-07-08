import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

const Section = styled.section`
  padding: 5rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
  z-index: 1;
`;

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px var(--mission-glow);
`;

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

const LeetCodeChart = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://leetcode-stats-api.herokuapp.com/DARSHANm17');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch LeetCode stats:', err);
      }
    };

    fetchStats();
  }, []);

  const chartData = stats
    ? [
        { name: 'Easy', value: stats.easySolved },
        { name: 'Medium', value: stats.mediumSolved },
        { name: 'Hard', value: stats.hardSolved }
      ]
    : [];

  return (
    <Section id="leetcode">
      <Title>LeetCode Problem Stats</Title>
      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 0, 0.2)" />
            <XAxis dataKey="name" stroke="var(--mission-green)" />
            <YAxis stroke="var(--mission-green)" />
            <Tooltip
              wrapperStyle={{ fontFamily: 'Share Tech Mono', backgroundColor: '#000', border: '1px solid #00ff00' }}
              contentStyle={{ backgroundColor: '#000', borderColor: '#00ff00' }}
              labelStyle={{ color: '#00ff00' }}
              itemStyle={{ color: '#00ff00' }}
            />
            <Bar dataKey="value" fill="#00ff00" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Section>
  );
};

export default LeetCodeChart;
