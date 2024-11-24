<template>
    <div class="about-container">
      <div class="about-header">
        <h1 class="about-title">美年大健康</h1>
        <p class="about-description">
          美年大健康是中国领先的健康体检和健康管理服务机构。秉持“以人为本，健康至上”的理念，美年致力于为个人、家庭和企业提供全面、专业、高效的健康体检服务，帮助客户了解身体状况，预防疾病，为健康生活保驾护航。
        </p>
      </div>
      <div class="about-content">
        <div class="about-image-container">
          <img class="about-image" src="@/assets/about1.png" alt="健康服务">
        </div>
        <div class="about-text">
          <h2>服务宗旨</h2>
          <p>
            美年大健康专注于为客户提供先进的体检设备、优质的医疗资源和高效的健康管理解决方案。通过大数据技术和智能化服务平台，我们致力于帮助客户提前发现健康隐患，倡导预防为主的健康理念。
          </p>
        </div>
      </div>
      <div class="about-content">
        <div class="about-text">
          <h2>覆盖范围</h2>
          <p>
            目前，美年大健康已在全国范围内建立了数百家体检中心，服务覆盖多个一线及二线城市，年体检量超过数千万人次。我们坚持“以客户为中心”，不断提升服务品质和技术水平。
          </p>
        </div>
        <div class="about-image-container">
          <img class="about-image" src="@/assets/about2.png" alt="体检中心">
        </div>
      </div>
      <div class="about-footer">
        <p>
          美年大健康将继续加大对健康管理和医疗服务的研发投入，不断优化服务流程，为推动国民健康水平的提升贡献力量。
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .about-container {
    font-family: Arial, sans-serif;
    margin: 30px;
    padding: 20px;
    color: #333;
  }
  
  .about-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .about-title {
    font-size: 36px;
    font-weight: bold;
    color: #000;
  }
  
  .about-description {
    font-size: 18px;
    margin-top: 10px;
    line-height: 1.8;
  }
  
  .about-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .about-image-container {
    flex: 1;
    text-align: center;
  }
  
  .about-image {
    width: 90%;
    border-radius: 10px;
  }
  
  .about-text {
    flex: 1;
    padding: 20px;
  }
  
  .about-text h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #0052cc;
  }
  
  .about-text p {
    font-size: 16px;
    line-height: 1.8;
  }
  
  .about-footer {
    text-align: center;
    margin-top: 40px;
    font-size: 16px;
    color: #666;
  }
  </style>
  