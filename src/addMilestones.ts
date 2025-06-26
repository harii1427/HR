import { database } from './firebase';
import { ref, set } from 'firebase/database';

const milestones = [
  { year: '2020', event: 'UniqHR founded with a vision to revolutionize recruitment' },
  { year: '2021', event: 'Reached 500 successful placements and expanded to 3 cities' },
  { year: '2022', event: 'Launched digital platform and AI-powered matching system' },
  { year: '2023', event: 'Partnered with 100+ companies and achieved 98% success rate' },
  { year: '2024', event: 'Opened new offices and expanded internationally' },
  { year: '2025', event: 'Leading the future of HR consulting with innovative solutions' }
];

const addMilestonesData = async () => {
  try {
    await set(ref(database, 'milestones'), milestones);
    console.log('Milestones data added successfully!');
  } catch (error) {
    console.error('Error adding milestones data: ', error);
  }
};

addMilestonesData();
