import { useRef, useState } from 'react';
import './Books3D.css';

interface Book {
  title: string;
  author: string;
  cover: string;
}

interface Books3DProps {
  books?: Book[];
}

const defaultBooks: Book[] = [
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    cover: 'https://framerusercontent.com/images/JXL9OqyS9HXAxdkH6ZGIV5PQXQQ.jpg',
  },
  {
    title: 'The Design of Books',
    author: 'Debbie Berne',
    cover: 'https://framerusercontent.com/images/KKumO9wIaqSfEWmnUggSi1qK8.jpg',
  },
  {
    title: 'Jony Ive',
    author: 'Leander Kahney',
    cover: 'https://framerusercontent.com/images/UP4YVHzcGXZHhAV01tVDuFq5q2k.jpg',
  },
];

const Books3D: React.FC<Books3DProps> = ({ books = defaultBooks }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openBooks, setOpenBooks] = useState<boolean[]>(books.map(() => false));

  const handleBookClick = (index: number) => {
    setOpenBooks(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div ref={containerRef} className="books3d-container">
      <div className="books3d-grid">
        {books.map((book, index) => (
          <div
            key={index}
            className={`books3d-book ${openBooks[index] ? 'is-open' : ''}`}
            onClick={() => handleBookClick(index)}
          >
            <div className="books3d-inner">
              <div className="books3d-pages">
                <p className="books3d-title">{book.title}</p>
                <p className="books3d-author">by {book.author}</p>
              </div>
              <div className="books3d-cover">
                <img src={book.cover} alt={book.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books3D;
