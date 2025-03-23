"use server";

import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

/**
 * Checks if a user has a default resume
 * @param {string} userId - The user's ID
 * @returns {Promise<boolean>} - True if user has default resume, false otherwise
 */
export async function hasDefaultResume(userId) {
  console.log("Checking for default resume for user:", userId);
  
  try {
    const defaultResumes = await db
      .select()
      .from(Resume)
      .where(
        and(
          eq(Resume.userId, userId),
          eq(Resume.isDefault, true)
        )
      );
    
    console.log(`Found ${defaultResumes.length} default resumes for user ${userId}`);
    return defaultResumes.length > 0;
  } catch (error) {
    console.error("Error checking for default resume:", error);
    return false;
  }
}

/**
 * Creates a default resume for a user
 * @param {string} userId - The user's ID
 * @param {object} resumeData - The resume data
 * @returns {Promise<object>} - The created resume
 */
export async function createDefaultResume(userId, resumeData) {
  console.log("Creating default resume for user:", userId);
  
  try {
    // Format the resume data for storage
    const formattedData = {
      resumeId: uuidv4(),
      userId: userId,
      title: `${resumeData.firstName} ${resumeData.lastName}'s Resume`,
      isDefault: true,
      data: JSON.stringify(resumeData),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert the resume into the database
    const result = await db
      .insert(Resume)
      .values(formattedData)
      .returning();
    
    console.log("Created default resume:", result[0]);
    return result[0];
  } catch (error) {
    console.error("Error creating default resume:", error);
    throw new Error("Failed to create default resume");
  }
}

/**
 * Gets all resumes for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} - The user's resumes
 */
export async function getUserResumes(userId) {
  try {
    const resumes = await db
      .select()
      .from(Resume)
      .where(eq(Resume.userId, userId))
      .orderBy(Resume.updatedAt);
    
    return resumes;
  } catch (error) {
    console.error("Error getting user resumes:", error);
    return [];
  }
}

/**
 * Updates an existing resume
 * @param {string} resumeId - The resume ID to update
 * @param {object} updateData - The data to update
 * @returns {Promise<object>} - The updated resume
 */
export async function updateResume(resumeId, updateData) {
  try {
    const result = await db
      .update(Resume)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(Resume.resumeId, resumeId))
      .returning();
    
    return result[0];
  } catch (error) {
    console.error("Error updating resume:", error);
    throw new Error("Failed to update resume");
  }
}

/**
 * Deletes a resume
 * @param {string} resumeId - The resume ID to delete
 * @returns {Promise<boolean>} - True if successful
 */
export async function deleteResume(resumeId) {
  try {
    await db
      .delete(Resume)
      .where(eq(Resume.resumeId, resumeId));
    
    return true;
  } catch (error) {
    console.error("Error deleting resume:", error);
    return false;
  }
} 