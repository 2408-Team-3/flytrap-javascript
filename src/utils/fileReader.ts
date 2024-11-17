export const readSourceFile = async (filePath: string): Promise<string | null> => {
  try {
    const cleanedPath = filePath.replace(/^[^(]*\(/, '').replace(/\)$/, '');
    const response = await fetch(cleanedPath);
    if (!response.ok) throw new Error(`Failed to fetch file: ${filePath}`); // Should this be here?
    return await response.text();
  } catch (error) {
    console.error('[flytrap] Could not fetch source file:', filePath, error);
    return null;
  }
}
