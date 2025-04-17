// activityService.js

const STORAGE_KEY = 'todo_activities';

/**
 * Generate a unique Activity ID using timestamp
 */
function generateActivityId() {
  return 'tsk' + Date.now();
}

/**
 * Retrieve all activities from localStorage
 */
function getActivities() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save all activities back to localStorage
 */
function saveActivities(activities) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

/**
 * Add a new activity
 * @param {string} title - Title of the new activity
 */
function addActivity(title) {
  const activities = getActivities();
  const newActivity = {
    activityId: generateActivityId(),
    activityTitle: title,
    isCompleted: false
  };
  activities.push(newActivity);
  saveActivities(activities);
  return newActivity;
}

/**
 * Edit an existing activity's title
 * @param {string} id - Activity ID to edit
 * @param {string} newTitle - New title for the activity
 */
function editActivity(id, newTitle) {
  const activities = getActivities();
  const index = activities.findIndex(act => act.activityId === id);
  if (index !== -1) {
    activities[index].activityTitle = newTitle;
    saveActivities(activities);
  }
}

/**
 * Delete an activity
 * @param {string} id - Activity ID to delete
 */
function deleteActivity(id) {
  const activities = getActivities().filter(act => act.activityId !== id);
  saveActivities(activities);
}

/**
 * Toggle completion status of an activity
 * @param {string} id - Activity ID to toggle
 */
function toggleActivityCompletion(id) {
  const activities = getActivities();
  const index = activities.findIndex(act => act.activityId === id);
  if (index !== -1) {
    activities[index].isCompleted = !activities[index].isCompleted;
    saveActivities(activities);
  }
}

// Expose functions (for HTML or other JS files)
window.activityService = {
  addActivity,
  editActivity,
  deleteActivity,
  toggleActivityCompletion,
  getActivities // optional: helpful for rendering
};
