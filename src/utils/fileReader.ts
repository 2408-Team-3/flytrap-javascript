export const readSourceFile = async (filePath: string): Promise<string | null> => {
  try {
    const cleanedPath = filePath.replace(/^[^(]*\(/, '').replace(/\)$/, '');
    const response = await fetch(cleanedPath);
    return await response.text();
  } catch (error) {
    console.error('[flytrap] Could not read source file:', filePath, error);
    return null;
  }
}
