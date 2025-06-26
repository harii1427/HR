import { database } from './firebase';
import { ref, set } from 'firebase/database';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: '15+ years in executive recruitment and talent strategy'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Talent Acquisition',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specializes in tech and finance sector placements'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Senior HR Consultant',
    image: 'https://images.pexels.com/photos/3760266/pexels-photo-3760266.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Expert in organizational development and culture'
  },
  {
    name: 'David Thompson',
    role: 'Career Coach',
    image: 'https://images.pexels.com/photos/3760280/pexels-photo-3760280.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Certified career coach with 10+ years experience'
  }
];

const addTeamData = async () => {
  try {
    await set(ref(database, 'team'), teamMembers);
    console.log('Team data added successfully!');
  } catch (error) {
    console.error('Error adding team data: ', error);
  }
};

addTeamData();
