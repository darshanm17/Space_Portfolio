import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import axios from 'axios';

const StatsSection = styled.section`
  padding: 5rem 2rem;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: auto;
`;

const StatCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid var(--mission-green);
  box-shadow: 0 0 20px var(--mission-glow);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  font-family: 'Share Tech Mono', monospace;
  color: var(--mission-green);
  transition: all 0.3s ease;

  h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px var(--mission-glow);
  }

  p {
    font-size: 1.4rem;
    font-weight: bold;
    opacity: 0.95;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 30px var(--mission-glow);
  }
`;

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

const LeetCodeSection = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://leetcode-stats-api.herokuapp.com/DARSHANm17');
        setStats(res.data);
      } catch (error) {
        console.error('LeetCode API error:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <StatsSection id="leetcode">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'Orbitron', fontSize: '2.5rem' }}>
        <span style={{ color: 'var(--mission-green)', textShadow: '0 0 10px var(--mission-glow)' }}>
          LeetCode Mission Report
        </span>
      </h2>
      <Grid>
        <StatCard whileHover={{ scale: 1.05 }}>
          <h3>Total Solved</h3>
          <p>{stats.totalSolved}</p>
        </StatCard>
        <StatCard whileHover={{ scale: 1.05 }}>
          <h3>Easy</h3>
          <p>{stats.easySolved}</p>
        </StatCard>
        <StatCard whileHover={{ scale: 1.05 }}>
          <h3>Medium</h3>
          <p>{stats.mediumSolved}</p>
        </StatCard>
        <StatCard whileHover={{ scale: 1.05 }}>
          <h3>Hard</h3>
          <p>{stats.hardSolved}</p>
        </StatCard>
        <StatCard whileHover={{ scale: 1.05 }}>
          <h3>Ranking</h3>
          <p>{stats.ranking}</p>
        </StatCard>
      </Grid>
    </StatsSection>
  );
};

export default LeetCodeSection;
