import React, { useState, useEffect } from 'react';

const Typewriter = ({ words, speed = 150 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      const nextCharIndex = isDeleting ? currentText.length - 1 : currentText.length + 1;
      
      setCurrentText(
        isDeleting ? fullWord.substring(0, nextCharIndex) : fullWord.substring(0, nextCharIndex)
      );

      if (!isDeleting && currentText === fullWord) {
        setTimeout(() => setIsDeleting(true), 1500); // 1.5 seconds pause
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    };

    const typingSpeed = isDeleting ? speed / 2 : speed;
    const timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, speed]);

  return <span>{currentText}</span>;
};

export default Typewriter;