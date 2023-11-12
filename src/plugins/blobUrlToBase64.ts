export async function blobUrlToBase64(blobUrl: string | undefined): Promise<string> {
  try {
    if (blobUrl === undefined) {
      return "";
    }
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error(`轉換錯誤：${error}`);
  }
}
