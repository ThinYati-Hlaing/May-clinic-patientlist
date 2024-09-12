export default function generateID() {
    const letters ="BSG";
    const randomLetters = 
      // letters.charAt(Math.floor(Math.random() * letters.length)) +
      letters.charAt(Math.floor(Math.random() * letters.length));
  
    const randomNumbers = ("0000" + Math.floor(Math.random() * 10000)).slice(-4);
  
    return `${randomLetters}-${randomNumbers}`;
  }