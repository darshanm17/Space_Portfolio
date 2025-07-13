import styled from '@emotion/styled';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const ContactContainer = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border: none;
  padding: 1rem 2rem;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  color: var(--background-dark);
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const SocialLink = styled(motion.a)`
  color: #fff;
  font-size: clamp(1.2rem, 5vw, 1.5rem);
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
      emailjs
      .sendForm(
        'service_4qikgvv',     // from EmailJS
        'template_cp4xi6v',    // from EmailJS
          e.currentTarget,
        'lLQrkTKQpKkDdpFQ8'      // from EmailJS dashboard
      )
      .then(
        () => {
          alert('Message sent successfully!');
           e.currentTarget.reset();
        },
        (error) => {
          alert('Something went wrong. Try again later.');
          console.error(error);
        }
      );
  };

  return (
     <ContactSection id="contact">
      <ContactContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SectionTitle>Contact Me</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input type="text" name="user_name" placeholder="Your Name" required />
          </InputGroup>
          <InputGroup>
            <Input type="email" name="user_email" placeholder="Your Email" required />
          </InputGroup>
          <InputGroup>
            <TextArea name="message" placeholder="Your Message" required />
          </InputGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </SubmitButton>
        </Form>
        <SocialLinks>
          <SocialLink
            href="https://github.com/darshanm17"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <i className="fab fa-github"></i>
          </SocialLink>
          <SocialLink
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <i className="fab fa-linkedin"></i>
          </SocialLink>
          <SocialLink
            href="https://x.com/Dev_404f"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <i className="fab fa-twitter"></i>
          </SocialLink>
          <SocialLink
            href="https://buymeacoffee.com/darshan17"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <img
    src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-1.svg"
    alt="Buy Me a Coffee"
    style={{ width: '24px', height: '24px' }}
  />
          </SocialLink>
        </SocialLinks>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
