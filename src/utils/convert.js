/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-20 22:36:20
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-22 10:21:20
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/utils/convert.js
 * @Description: 
 * 2405499352@qq.com
 */
// 格式化日期

import dayjs from 'dayjs';
export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("zh-CN", options);
  };
  

export const formatDateTime = (date) => {
  if (!date) return '无';
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const formatCurrency = (value) => {
  return `¥${Number(value).toFixed(2)}`;
};