import { database } from './firebase';
import { ref, set } from 'firebase/database';

const featuredPost = {
  id: 1,
  title: "The Future of Remote Work: Trends Shaping 2025",
  excerpt: "Explore how remote work is evolving and what it means for both employers and job seekers in the current market landscape.",
  image: "https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?auto=compress&cs=tinysrgb&w=800",
  author: "Sarah Johnson",
  date: "2025-01-15",
  readTime: "8 min read",
  category: "Industry Trends"
};

const blogPosts = [
  {
    id: 2,
    title: "Salary Negotiation Strategies That Actually Work",
    excerpt: "Master the art of salary negotiation with proven strategies that help you secure better compensation packages.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Michael Chen",
    date: "2025-01-12",
    readTime: "6 min read",
    category: "Career Tips"
  },
  {
    id: 3,
    title: "Building Your Professional Network in the Digital Age",
    excerpt: "Learn how to effectively network online and build meaningful professional relationships that advance your career.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Emily Rodriguez",
    date: "2025-01-10",
    readTime: "5 min read",
    category: "Networking"
  },
  {
    id: 4,
    title: "Top Skills Employers Are Looking for in 2025",
    excerpt: "Stay ahead of the curve by developing these in-demand skills that employers are actively seeking.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "David Thompson",
    date: "2025-01-08",
    readTime: "7 min read",
    category: "Skills Development"
  },
  {
    id: 5,
    title: "How to Optimize Your LinkedIn Profile for Job Success",
    excerpt: "Transform your LinkedIn profile into a powerful job-search tool with these optimization strategies.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Sarah Johnson",
    date: "2025-01-05",
    readTime: "4 min read",
    category: "Personal Branding"
  },
  {
    id: 6,
    title: "Interview Preparation: From Research to Follow-up",
    excerpt: "A comprehensive guide to interview preparation that covers everything from company research to post-interview follow-up.",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Michael Chen",
    date: "2025-01-03",
    readTime: "9 min read",
    category: "Interview Tips"
  },
  {
    id: 7,
    title: "The Rise of AI in Recruitment: What Candidates Need to Know",
    excerpt: "Understand how artificial intelligence is changing the recruitment process and how to adapt your job search strategy.",
    image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Emily Rodriguez",
    date: "2025-01-01",
    readTime: "6 min read",
    category: "Technology"
  }
];

const addBlogsData = async () => {
  try {
    const allPosts = [featuredPost, ...blogPosts];
    await set(ref(database, 'blogs/posts'), allPosts);
    console.log('Blogs data added successfully!');
  } catch (error) {
    console.error('Error adding blogs data: ', error);
  }
};

addBlogsData();
