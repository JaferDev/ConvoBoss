function AppendStorage(value, valueContainerKey)
{
    if (!localStorage.getItem(valueContainerKey)) localStorage[valueContainerKey] = JSON.stringify([value]);
    else
    {
        let valueArray = JSON.parse(localStorage[valueContainerKey]);
        valueArray.push(value);
        localStorage[valueContainerKey] = JSON.stringify(valueArray);
    }
}

function WriteStorage(value, key)
{
    localStorage[key] = JSON.stringify(value);
}

function ReadStorage(key)
{
    return JSON.parse(localStorage.getItem(key));
}

export {AppendStorage, WriteStorage, ReadStorage};