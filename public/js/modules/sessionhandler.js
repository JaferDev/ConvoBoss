function StartSession(value, key)
{
    sessionStorage[key] = JSON.stringify(value);
}

function ReadSession(key)
{
    return JSON.parse(sessionStorage.getItem(key));
}

export {StartSession, ReadSession};