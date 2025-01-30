const url = 'https://cat-fact.herokuapp.com/facts';

const factPara = document.querySelector('#fact');
const btn = document.querySelector('#btn');
/// status 200 is equal to successful request


//fetch method return a promise, it use request and response objects
//fetch(url,[options]) method is use to fetch data from url
//fetch(url) agr hm option k bghair fetch method mn url likhain to phr 
//         fetch method particular type ke request bhejta ha, jisy GET Request kehty hn
// fetch method ke different type ke request hote hn, 
// jsa k get request(receive data), post request(create new data), put request(update existing data), delete request(delete data)
// CRUD(creat(post), read(get), update(put), delete(delete))
// GET request sirf data lany ka kaam krta ha, mtlb data return krte ha.


// json() method return a promise
// json() method ko input mn json data dete hn, aur json method return mn hme useable js data deta ha.

const getFacts = async () => {
    // console.log('getting data...');
    let response = await fetch(url);
    console.log(response); // response is in JSON format
    // console.log(response).status;
    let data = await response.json();
    factPara.innerText = data[0].text;
    // console.log(data[0].text);

}

btn.addEventListener('click', getFacts);