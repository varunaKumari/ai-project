/**
 * Axios-based API client.
 * Vite's proxy forwards /api/* to http://127.0.0.1:8000
 * so we only need a relative base URL in development.
 */

import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// ---- Health ----------------------------------------------------------------
export const checkHealth = () => api.get('/health')

// ---- Exams -----------------------------------------------------------------
export const getExams = () => api.get('/exams/')
export const getExam = (id) => api.get(`/exams/${id}`)
export const createExam = (data) => api.post('/exams/', data)
export const updateExam = (id, data) => api.put(`/exams/${id}`, data)
export const deleteExam = (id) => api.delete(`/exams/${id}`)

// ---- Rooms -----------------------------------------------------------------
export const getRooms = () => api.get('/rooms/')
export const createRoom = (data) => api.post('/rooms/', data)
export const updateRoom = (id, data) => api.put(`/rooms/${id}`, data)
export const deleteRoom = (id) => api.delete(`/rooms/${id}`)

// ---- Time Slots ------------------------------------------------------------
export const getTimeslots = () => api.get('/timeslots/')
export const createTimeslot = (data) => api.post('/timeslots/', data)
export const updateTimeslot = (id, data) => api.put(`/timeslots/${id}`, data)
export const deleteTimeslot = (id) => api.delete(`/timeslots/${id}`)

// ---- Timetable -------------------------------------------------------------
export const getTimetable = () => api.get('/timetable/')
export const generateTimetable = (options) => api.post('/timetable/generate', options)
export const clearTimetable = () => api.delete('/timetable/')

export default api
