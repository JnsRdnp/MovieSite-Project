import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function GroupDetail() {
    const { group_name } = useParams();
    const [usernames, setUsernames] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);
  
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users_groups/${group_name}`);
        setUsernames(response.data.map(user => ({ username: user.username, admin: user.admin })));
      } catch (error) {
        console.error('Error fetching group members:', error.response ? error.response.data : error.message);
      }
    };
  
    const fetchGroupReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users_groups/reviewforgroup/${group_name}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching group reviews:', error.response ? error.response.data : error.message);
      }
    };
  
    const fetchMoviesForReviews = async () => {
      try {
        if (reviews.length > 0) {
          const movieIds = reviews.map((review) => review.moviedb_movieid);
  
          const responses = await Promise.all(
            movieIds.map(async (movieId) => {
              try {
                const response = await axios.get(`http://localhost:3001/movies/id/${movieId}`);
                return response.data;
              } catch (error) {
                console.error(`Error fetching movie with ID ${movieId}:`, error.response ? error.response.data : error.message);
                return null;
              }
            })
          );
  
          const movieDatas = responses.filter((response) => response !== null);
          setMovies(movieDatas);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
    
    useEffect(() => {
      fetchGroupMembers();
      fetchGroupReviews();
    }, []);
  
    useEffect(() => {
      fetchMoviesForReviews();
    }, [reviews]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Display group reviews on the left side */}
          <div style={{ width: '45%', border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <h3>Group Reviews</h3>
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <strong>{review.username}</strong> - <strong>{movies[index]?.original_title}</strong> - {review.review} ({review.movieid})
                </li>
              ))}
            </ul>
          </div>
      
          {/* Display group members on the right side */}
          <div style={{ width: '45%', border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <h3>Group Members</h3>
            <ul>
              {usernames.map((user, index) => (
                <li key={index}>
                  <strong>{user.username}</strong> - {user.admin ? 'Admin' : 'Member'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );            
}      
  export default GroupDetail;
  