function StartSession(value, key)
{
    sessionStorage[key] = JSON.stringify(value);
}

export {StartSession};