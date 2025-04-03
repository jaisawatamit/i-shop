import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

const titleToSlug = (title) => {
    return title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
  
        .replace(/^-+|-+$/g, '');
}


const TimeAgo = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    // Reset time part to midnight
    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in time
    const timeDifference = Math.abs(currentDate - givenDate);

    // Calculate the difference in days
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (dayDifference === 0) {
        return "Today";
    } else if (dayDifference === 1) {
        return "Yesterday";
    } else {
        return `${dayDifference} days ago`;
    }
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    
    return `${day}/${month}/${year}`;
  }

  function capitalizeWords(str) {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  
  const getKeyByValue = (object, value) => {
    return Object.entries(object).find(([key, val]) => val === value)?.[0];
  };



export { titleToSlug , TimeAgo ,formatDate,capitalizeWords,getKeyByValue, axiosInstance};