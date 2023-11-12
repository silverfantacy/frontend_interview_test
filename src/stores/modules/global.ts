import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface GlobalState {
    isLoading: boolean;
    filters: {
        limit: number;
        title: string;
    };
    adData: any[];
    selectedAdData: any | null;
}

export const useGlobalStore = defineStore('global', () => {
    const state: GlobalState = reactive({
        isLoading: false,
        filters: {
            limit: 5,
            title: '',
        },
        adData: [
            {
                id: 1,
                title: '測試1',
                status: true,
                url: 'https://www.google.com.tw/maps',
                img: 'https://fakeimg.pl/200x120/?retina=1&text=こんにちは1&font=noto',
            },
            {
                id: 2,
                title: '測試2',
                status: true,
                url: 'https://www.google.com.tw/maps',
                img: 'https://fakeimg.pl/200x120/?retina=1&text=こんにちは2&font=noto',
            },
            {
                id: 3,
                title: '測試3',
                status: true,
                url: 'https://www.google.com.tw/maps',
                img: 'https://fakeimg.pl/200x120/?retina=1&text=こんにちは3&font=noto',
            },
            {
                id: 4,
                title: '測試4',
                status: true,
                url: 'https://www.google.com.tw/maps',
                img: 'https://fakeimg.pl/200x120/?retina=1&text=こんにちは4&font=noto',
            },
            {
                id: 5,
                title: '測試5',
                status: true,
                url: 'https://www.google.com.tw/maps',
                img: 'https://fakeimg.pl/200x120/?retina=1&text=こんにちは5&font=noto',
            },
            {
                id: 6,
                title: '測試6',
                status: true,
                url: 'https://www.google.com.tw/maps',
                img: 'https://fakeimg.pl/200x120/?retina=1&text=こんにちは6&font=noto',
            }
        ],
        selectedAdData: {
            id: null,
            title: '',
            status: true,
            url: '',
            img: '',
        },
    });

    const setLoading = (value: boolean) => {
        state.isLoading = value;
    };

    const createAdData = (data: any) => {
        let id = state.adData[state.adData.length - 1].id + 1
        state.adData.push({...data, id: id})
    }
    const updateAdData = (id: number, data: any) => {
        let index = state.adData.findIndex((item: any) => item.id == id)
        state.adData[index] = data
    }

    const deleteAdData = (id: number) => {
        let index = state.adData.findIndex((item: any) => item.id == id)
        state.adData.splice(index, 1)
    }

    const setSelectedAdData = (data: any) => {
        Object.assign(state.selectedAdData, data);
    }

    const clearSelectedAdData = () => {
        Object.assign(state.selectedAdData, {
            id: null,
            title: '',
            status: true,
            url: '',
            img: '',
        });
    }


    return {
        ...state,

        setLoading,
        // setFilters,

        createAdData,
        updateAdData,
        deleteAdData,

        setSelectedAdData,
        clearSelectedAdData
    };
});
