// Kiểm tra khả năng của localStorage
const isLocalStorageAvailable = () => {
  try {
    const test = "__test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Set item vào localStorage
export const setLocalStorage = (key, value) => {
  if (isLocalStorageAvailable()) {
    try {
      // Nếu là đối tượng hoặc mảng, chuyển đổi sang JSON string
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Không thể lưu trữ vào localStorage", e);
    }
  } else {
    console.warn("localStorage không khả dụng");
  }
};

// Lấy item từ localStorage
export const getLocalStorage = (key) => {
  if (isLocalStorageAvailable()) {
    const value = localStorage.getItem(key);
    try {
      // Nếu có thể parse JSON, thì trả về đối tượng hoặc mảng
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return value; // Nếu không phải đối tượng JSON, trả về chuỗi
    }
  } else {
    console.warn("localStorage không khả dụng");
    return null;
  }
};

// Xóa item khỏi localStorage
export const deleteStorage = (key) => {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Không thể xóa item khỏi localStorage", e);
    }
  } else {
    console.warn("localStorage không khả dụng");
  }
};

// Xóa tất cả dữ liệu trong localStorage
export const clearStorage = () => {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Không thể xóa tất cả dữ liệu khỏi localStorage", e);
    }
  } else {
    console.warn("localStorage không khả dụng");
  }
};
