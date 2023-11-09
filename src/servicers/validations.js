export const objectIsEmpty = (obj) => {
    const fields = Object.keys(obj);
    
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (!obj[field] || obj[field] === "") return true;
    }
    return false; 
}
  