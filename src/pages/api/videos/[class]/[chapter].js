// API endpoint to fetch video URL from database based on class and chapter
// Replace the mock data with your actual database query

/**
 * DATABASE CONNECTION GUIDE:
 * 
 * 1. Install your database client:
 *    - MongoDB: npm install mongodb
 *    - PostgreSQL: npm install pg
 *    - MySQL: npm install mysql2
 * 
 * 2. Create a database connection file (e.g., lib/db.js):
 *    - Set up connection pool
 *    - Export connection function
 * 
 * 3. Replace the mock data section below with your database query
 * 
 * Example MongoDB:
 *    const { MongoClient } = require('mongodb');
 *    const client = await MongoClient.connect(process.env.MONGODB_URI);
 *    const db = client.db('studypilot');
 *    const video = await db.collection('videos').findOne({
 *      class: classNumber,
 *      chapter: chapterNumber
 *    });
 * 
 * Example PostgreSQL:
 *    const { Pool } = require('pg');
 *    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
 *    const result = await pool.query(
 *      'SELECT video_url, title FROM videos WHERE class = $1 AND chapter = $2',
 *      [classNumber, chapterNumber]
 *    );
 *    const video = result.rows[0];
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { class: classNum, chapter } = req.query;

  // Validate parameters
  if (!classNum || !chapter) {
    return res.status(400).json({ 
      error: 'Class and chapter parameters are required',
      example: '/api/videos/1/1'
    });
  }

  const classNumber = parseInt(classNum);
  const chapterNumber = parseInt(chapter);

  // Validate class range (1-5)
  if (isNaN(classNumber) || classNumber < 1 || classNumber > 5) {
    return res.status(400).json({ 
      error: 'Class must be a number between 1 and 5' 
    });
  }

  // Validate chapter number
  if (isNaN(chapterNumber) || chapterNumber < 1) {
    return res.status(400).json({ 
      error: 'Chapter must be a valid positive number' 
    });
  }

  try {
    // TODO: Replace this mock data with actual database query
    // Uncomment and modify the database query code above based on your database
    
    // ============================================
    // MOCK DATA - REPLACE WITH DATABASE QUERY
    // ============================================
    const mockVideos = {
      '1-1': { videoUrl: '/videos/class1/chapter1.mp3', title: 'Class 1 - Chapter 1' },
      '1-2': { videoUrl: '/videos/class1/chapter2.mp3', title: 'Class 1 - Chapter 2' },
      '2-1': { videoUrl: '/videos/class2/chapter1.mp3', title: 'Class 2 - Chapter 1' },
      '2-2': { videoUrl: '/videos/class2/chapter2.mp3', title: 'Class 2 - Chapter 2' },
      '3-1': { videoUrl: '/videos/class3/chapter1.mp3', title: 'Class 3 - Chapter 1' },
      '4-1': { videoUrl: '/videos/class4/chapter1.mp3', title: 'Class 4 - Chapter 1' },
      '5-1': { videoUrl: '/videos/class5/chapter1.mp3', title: 'Class 5 - Chapter 1' },
      // Add more mock data as needed
    };

    const videoKey = `${classNumber}-${chapterNumber}`;
    const videoData = mockVideos[videoKey];

    // ============================================
    // DATABASE QUERY EXAMPLE (uncomment and modify):
    // ============================================
    // const video = await db.collection('videos').findOne({
    //   class: classNumber,
    //   chapter: chapterNumber
    // });
    // 
    // if (!video) {
    //   return res.status(404).json({ 
    //     error: `Video not found for Class ${classNumber}, Chapter ${chapterNumber}` 
    //   });
    // }
    //
    // return res.status(200).json({
    //   class: classNumber,
    //   chapter: chapterNumber,
    //   videoUrl: video.video_url, // or video.videoUrl depending on your schema
    //   title: video.title || `Class ${classNumber} - Chapter ${chapterNumber}`,
    // });

    if (!videoData) {
      return res.status(404).json({ 
        error: `Video not found for Class ${classNumber}, Chapter ${chapterNumber}`,
        message: 'Please add this video to the database or mock data'
      });
    }

    // Return video data
    // In production, videoUrl should be the full URL from your database
    // It can be a relative path (if videos are in public folder) or absolute URL
    res.status(200).json({
      class: classNumber,
      chapter: chapterNumber,
      videoUrl: videoData.videoUrl,
      title: videoData.title,
    });

  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

