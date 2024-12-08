export const fetchOptionsFromAPI = async ({ url }: { url: string }) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch options: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map((item: any) => ({
        label: item.name,
        value: item.id,
    }));
};
