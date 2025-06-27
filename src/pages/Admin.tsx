import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, set, onValue } from 'firebase/database';
import toast from 'react-hot-toast';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('blog');

  const renderForm = () => {
    switch (activeTab) {
      case 'blog':
        return <BlogForm />;
      case 'flashnews':
        return <FlashNewsForm />;
      case 'milestone':
        return <MilestoneForm />;
      case 'service':
        return <ServiceForm />;
      case 'team':
        return <TeamForm />;
      case 'requests':
        return <SubmittedRequests />;
      default:
        return <BlogForm />;
    }
  };

  return (
    <div className="pt-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="relative inline-block text-left mb-4">
              <div>
                <select
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  <option value="blog">Blog</option>
                  <option value="flashnews">Flash News</option>
                  <option value="milestone">Milestone</option>
                  <option value="service">Service</option>
                  <option value="team">Team</option>
                  <option value="requests">Submitted Requests</option>
                </select>
              </div>
            </div>
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const BlogForm = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const blogsRef = ref(database, 'blogs/posts');
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const blogList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setBlogs(blogList);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const blogRef = ref(database, `blogs/posts/${editingId}`);
      set(blogRef, {
        title,
        excerpt,
        content,
        image,
        author,
        date,
        readTime,
        category,
      });
      setEditingId(null);
      toast.success('Blog post updated successfully!');
    } else {
      const blogsRef = ref(database, 'blogs/posts');
      onValue(blogsRef, (snapshot) => {
        const data = snapshot.val() || [];
        const newIndex = data.length;
        const newBlogRef = ref(database, `blogs/posts/${newIndex}`);
        set(newBlogRef, {
          id: newIndex,
          title,
          excerpt,
          content,
          image,
          author,
          date,
          readTime,
          category,
        });
        toast.success('Blog post added successfully!');
      }, { onlyOnce: true });
    }
    setTitle('');
    setExcerpt('');
    setContent('');
    setImage('');
    setAuthor('');
    setDate('');
    setReadTime('');
    setCategory('');
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setImage(blog.image);
    setAuthor(blog.author);
    setDate(blog.date);
    setReadTime(blog.readTime);
    setCategory(blog.category);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const blogRef = ref(database, `blogs/posts/${id}`);
      set(blogRef, null);
      toast.success('Blog post deleted successfully!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{editingId ? 'Edit Blog Post' : 'Add New Blog Post'}</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="excerpt"
            placeholder="Excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      const MAX_WIDTH = 800;
                      const MAX_HEIGHT = 600;
                      let width = img.width;
                      let height = img.height;

                      if (width > height) {
                        if (width > MAX_WIDTH) {
                          height *= MAX_WIDTH / width;
                          width = MAX_WIDTH;
                        }
                      } else {
                        if (height > MAX_HEIGHT) {
                          width *= MAX_HEIGHT / height;
                          height = MAX_HEIGHT;
                        }
                      }
                      canvas.width = width;
                      canvas.height = height;
                      ctx.drawImage(img, 0, 0, width, height);
                      const dataUrl = canvas.toDataURL(file.type, 0.7);
                      setImage(dataUrl);
                    }
                  };
                  if (event.target?.result) {
                    img.src = event.target.result.toString();
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        {image && <img src={image} alt="preview" className="w-32 h-32 object-cover rounded-lg mb-4" />}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="readTime">
            Read Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="readTime"
            type="text"
            placeholder="Read Time"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Update Post' : 'Add Post'}
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Existing Blog Posts</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(blog)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FlashNewsForm = () => {
  const [news, setNews] = useState<string[]>([]);
  const [currentNews, setCurrentNews] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const flashNewsRef = ref(database, 'flashnews');
    onValue(flashNewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNews(data);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flashNewsRef = ref(database, 'flashnews');
    if (editingIndex !== null) {
      const updatedNews = [...news];
      updatedNews[editingIndex] = currentNews;
      set(flashNewsRef, updatedNews);
      setEditingIndex(null);
      toast.success('Flash news updated successfully!');
    } else {
      const updatedNews = [...news, currentNews];
      set(flashNewsRef, updatedNews);
      toast.success('Flash news added successfully!');
    }
    setCurrentNews('');
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setCurrentNews(news[index]);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this flash news?')) {
      const updatedNews = [...news];
      updatedNews.splice(index, 1);
      const flashNewsRef = ref(database, 'flashnews');
      set(flashNewsRef, updatedNews);
      toast.success('Flash news deleted successfully!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{editingIndex !== null ? 'Edit Flash News' : 'Add Flash News'}</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="news">
            News
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="news"
            type="text"
            placeholder="Flash News"
            value={currentNews}
            onChange={(e) => setCurrentNews(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingIndex !== null ? 'Update News' : 'Add News'}
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Existing Flash News</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  News
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(index)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface Milestone {
  id: string;
  year: string;
  event: string;
}

const MilestoneForm = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [year, setYear] = useState('');
  const [event, setEvent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const milestonesRef = ref(database, 'milestones');
    onValue(milestonesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const milestoneList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setMilestones(milestoneList);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const milestoneRef = ref(database, `milestones/${editingId}`);
      set(milestoneRef, { year, event });
      setEditingId(null);
      toast.success('Milestone updated successfully!');
    } else {
      const milestonesRef = ref(database, 'milestones');
      onValue(milestonesRef, (snapshot) => {
        const data = snapshot.val() || [];
        const newIndex = data.length;
        const newMilestoneRef = ref(database, `milestones/${newIndex}`);
        set(newMilestoneRef, { year, event });
        toast.success('Milestone added successfully!');
      }, { onlyOnce: true });
    }
    setYear('');
    setEvent('');
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingId(milestone.id);
    setYear(milestone.year);
    setEvent(milestone.event);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      const milestoneRef = ref(database, `milestones/${id}`);
      set(milestoneRef, null);
      toast.success('Milestone deleted successfully!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{editingId ? 'Edit Milestone' : 'Add Milestone'}</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
            Year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="year"
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event">
            Event
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="event"
            type="text"
            placeholder="Event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Update Milestone' : 'Add Milestone'}
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Existing Milestones</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {milestones.map((milestone) => (
                <tr key={milestone.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{milestone.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{milestone.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(milestone)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(milestone.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ServiceForm = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const servicesRef = ref(database, 'services');
    onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const serviceList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setServices(serviceList);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const serviceRef = ref(database, `services/${editingId}`);
      set(serviceRef, { title, description, image });
      setEditingId(null);
      toast.success('Service updated successfully!');
    } else {
      const servicesRef = ref(database, 'services');
      onValue(servicesRef, (snapshot) => {
        const data = snapshot.val() || [];
        const newIndex = data.length;
        const newServiceRef = ref(database, `services/${newIndex}`);
        set(newServiceRef, { title, description, image });
        toast.success('Service added successfully!');
      }, { onlyOnce: true });
    }
    setTitle('');
    setDescription('');
    setImage('');
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setDescription(service.description);
    setImage(service.image);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const serviceRef = ref(database, `services/${id}`);
      set(serviceRef, null);
      toast.success('Service deleted successfully!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{editingId ? 'Edit Service' : 'Add Service'}</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      const MAX_WIDTH = 800;
                      const MAX_HEIGHT = 600;
                      let width = img.width;
                      let height = img.height;

                      if (width > height) {
                        if (width > MAX_WIDTH) {
                          height *= MAX_WIDTH / width;
                          width = MAX_WIDTH;
                        }
                      } else {
                        if (height > MAX_HEIGHT) {
                          width *= MAX_HEIGHT / height;
                          height = MAX_HEIGHT;
                        }
                      }
                      canvas.width = width;
                      canvas.height = height;
                      ctx.drawImage(img, 0, 0, width, height);
                      const dataUrl = canvas.toDataURL(file.type, 0.7);
                      setImage(dataUrl);
                    }
                  };
                  if (event.target?.result) {
                    img.src = event.target.result.toString();
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        {image && <img src={image} alt="preview" className="w-32 h-32 object-cover rounded-lg mb-4" />}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Existing Services</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(service)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamForm = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const teamRef = ref(database, 'team');
    onValue(teamRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const teamList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setTeam(teamList);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const teamRef = ref(database, `team/${editingId}`);
      set(teamRef, { name, role, image, bio });
      setEditingId(null);
      toast.success('Team member updated successfully!');
    } else {
      const teamRef = ref(database, 'team');
      onValue(teamRef, (snapshot) => {
        const data = snapshot.val() || [];
        const newIndex = data.length;
        const newTeamRef = ref(database, `team/${newIndex}`);
        set(newTeamRef, { name, role, image, bio });
        toast.success('Team member added successfully!');
      }, { onlyOnce: true });
    }
    setName('');
    setRole('');
    setImage('');
    setBio('');
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setImage(member.image);
    setBio(member.bio);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      const teamRef = ref(database, `team/${id}`);
      set(teamRef, null);
      toast.success('Team member deleted successfully!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{editingId ? 'Edit Team Member' : 'Add Team Member'}</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      const MAX_WIDTH = 800;
                      const MAX_HEIGHT = 600;
                      let width = img.width;
                      let height = img.height;

                      if (width > height) {
                        if (width > MAX_WIDTH) {
                          height *= MAX_WIDTH / width;
                          width = MAX_WIDTH;
                        }
                      } else {
                        if (height > MAX_HEIGHT) {
                          width *= MAX_HEIGHT / height;
                          height = MAX_HEIGHT;
                        }
                      }
                      canvas.width = width;
                      canvas.height = height;
                      ctx.drawImage(img, 0, 0, width, height);
                      const dataUrl = canvas.toDataURL(file.type, 0.7);
                      setImage(dataUrl);
                    }
                  };
                  if (event.target?.result) {
                    img.src = event.target.result.toString();
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        {image && <img src={image} alt="preview" className="w-32 h-32 object-cover rounded-lg mb-4" />}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Update Team Member' : 'Add Team Member'}
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Existing Team Members</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {team.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(member)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  skills: string;
  resume: string;
  linkedIn: string;
  portfolio: string;
  expectedSalary: string;
  availability: string;
  submittedAt: string;
}

const SubmittedRequests = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profilesRef = ref(database, 'profiles');
    onValue(profilesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const profileList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProfiles(profileList);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Submitted Requests</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Education
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                LinkedIn
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Portfolio
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expected Salary
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Availability
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted At
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resume
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{profile.firstName} {profile.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.experience}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.education}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.skills}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><a href={profile.linkedIn} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View</a></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><a href={profile.portfolio} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View</a></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.expectedSalary}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.availability}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(profile.submittedAt).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href={profile.resume} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View Resume</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
