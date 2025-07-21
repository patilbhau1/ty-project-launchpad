import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ApprovedIdeaPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    approvedIdea: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: '', phone: '', approvedIdea: '' });
      navigate('/idea-generator');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="relative flex-shrink-0">
        <div className="w-full flex justify-center items-center px-4 pt-10">
          <div className='font-bugeria z-10 text-4xl'>
            <h1>Got Your Own Custom Idea</h1>
          </div>
        </div>
        <div className='absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-[#1a1a1a] via-black/40 to-transparent pointer-events-none'></div>
      </div>
      <main className='flex-1 h-full w-full flex items-center justify-center p-4'>
        <div className='w-full max-w-[400px] mx-auto'>
          <form onSubmit={handleSubmit} className="bg-[#161616] backdrop-blur-sm font-bugeria rounded-2xl px-8 py-7 shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='ex: pravin patil'
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-white/20 rounded-lg text-white bg-[#1F1F1F]"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name='phone'
                pattern='[6-9]{1}[0-9]{9}'
                placeholder='ex: 9987852035'
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  handleChange({
                    target: {
                      name: 'phone',
                      value
                    }
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                maxLength={10}
                className="w-full p-2 border border-white/20 rounded-lg text-white bg-[#1F1F1F]"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="approvedIdea" className="block mb-2">Your Idea:</label>
              <textarea
                id="approvedIdea"
                name="approvedIdea"
                value={formData.approvedIdea}
                onChange={handleChange}
                placeholder='Briefly describe your idea or paste details here — we’ll contact you to discuss the project and tech stack'
                rows={4}
                className="w-full p-2 border border-white/20 rounded-lg text-white bg-[#1F1F1F]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-white/20 rounded-lg text-black font-bold bg-[#FB7938]"
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Submitting...' : 'Submit Idea'}
            </button>

            {isSubmitted && (
              <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
                Thank you for your submission! Redirecting...
              </div>
            )}
          </form>
        </div>
      </main>
      <footer className="relative w-full h-40 flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/video/0721.mp4"
            loop
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <p className="text-2xl md:text-4xl font-feasy text-white">
            made with 💖 by Akhilesh
          </p>
        </div>
      </footer>

    </div>
  );
};

export default ApprovedIdeaPage;
