import AsyncStorage from '@react-native-community/async-storage';

export const login = async (url, data) => {
    const res = await fetch(url, { method: 'post', body: JSON.stringify((data)) });
    const finalRes = await res.json();

    if (finalRes.ResponseCode == 1) {
        await AsyncStorage.setItem('startScreen', "loginsucess");
        await AsyncStorage.setItem('logindata', JSON.stringify(finalRes.user_data));
    } else {
        alert(finalRes.ResponseMsg)
    }
    return finalRes;
};

export const getkulam = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
};
export const getconfig = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
}
export const onboardscreen = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
};
export const gettemples = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
};
export const getgallerys = async (url) => {
    const res = await fetch(url, { method: 'post' });
    const finalRes = await res.json();
    return finalRes;
};


export const registetion = async (url, data) => {
    const res = await fetch(url, { method: 'post', body: JSON.stringify((data)) });
    const finalRes = await res.json();
    await AsyncStorage.setItem('registetiondata', JSON.stringify(finalRes));
    return finalRes;
};

export const addmember = async (url, data) => {
    const res = await fetch(url, { method: 'post', body: JSON.stringify((data)) });
    const finalRes = await res.json();
    return finalRes;
};

export const getmember = async (url, data) => {
    const res = await fetch(url, { method: 'post', body: JSON.stringify((data)) });
    const finalRes = await res.json();
    return finalRes;
};

export const addevent = async (url, data) => {
    const res = await fetch(url, { method: 'post', body: JSON.stringify((data)) });
    const finalRes = await res.json();
    return finalRes;
};
export const addtemplehistory = async (url, data) => {
    const res = await fetch(url, { method: 'post', body: JSON.stringify((data)) });
    const finalRes = await res.json();
    return finalRes;
};
export const addgallery = async (url, data) => {
    const res = await fetch(url, { method: 'post', body: JSON.stringify((data)) });
    const finalRes = await res.json();
    return finalRes;
};
export const updatepro = async (url, data) => {
    const res = await fetch(url, { method: 'post', body: JSON.stringify((data)) });
    const finalRes = await res.json();
    return finalRes;
};

