const scriptURL = 'https://script.google.com/macros/s/AKfycby0XUNLUQoEWmmpflLAOqLUjg4Z1zbcLcSHotl-mxu0fCla64nKSwIEppMLWymKmJeO8g/exec';

function handleCycleChange() {
  const val = document.getElementById('cyclePhase').value;
  const note = document.getElementById('cycleNote');
  
  if (val === 'قبل الدورة') {
    note.style.display = 'block';
    note.innerText = '🌸 قد تشعرين برغبة في أكل الحلويات، لا بأس بقطعة حلوى!';
  } else if (val === 'فترة تبويض') {
    note.style.display = 'block';
    note.innerText = '🌟 قد تشعرين بأنك في أفضل حالاتك وقوتك!';
  } else if (val === 'أسبوع الدورة') {
    note.style.display = 'block';
    note.innerText = '💆‍♀️ استمعي لجسدك ولا تضغطي على نفسك، ولا بأس بتمرة مع قرفة!';
  } else {
    note.style.display = 'none';
  }
}

function handleWaterChange() {
  const val = parseFloat(document.getElementById('waterIntake').value);
  const note = document.getElementById('waterNote');

  if (isNaN(val) || val <= 0) {
    note.style.display = 'none';
    return;
  }

  note.style.display = 'block';
  if (val < 2) {
    note.innerText = '💧 حاولي ولو نص إضافي!';
  } else if (val === 2.5) {
    note.innerText = '✨ أنت تستطيعين نص إضافي!';
  } else if (val >= 3) {
    note.innerText = '🎉 ممتاز للغاية (إنجاز عظيم يا جميلة!)';
  } else {
    note.style.display = 'none';
  }
}

function handleWorkoutTypeChange() {
  const val = document.getElementById('workoutType').value;
  const warmup = document.getElementById('warmupNote');
  const upper = document.getElementById('upperBodySection');
  const lower = document.getElementById('lowerBodySection');

  if (val === 'Upper Body') {
    warmup.style.display = 'block';
    warmup.innerText = '🔥 إحماء الجزء العلوي (5-8 دقائق): دوائر الذراعين، إحماء الأكتاف، وتمدد الظهر والصدر.';
    upper.style.display = 'block';
    lower.style.display = 'none';
  } else if (val === 'Lower Body') {
    warmup.style.display = 'block';
    warmup.innerText = '🔥 إحماء الجزء السفلي (5-8 دقائق): سكوات بدون وزن، إحماء الحوض (Hip Openers)، وتمدد الفخذين.';
    upper.style.display = 'none';
    lower.style.display = 'block';
  } else {
    warmup.style.display = 'none';
    upper.style.display = 'none';
    lower.style.display = 'none';
  }
}

function nextPage() {
  const week = document.getElementById('weekNumber').value;
  const day = document.getElementById('dayOfWeek').value;
  document.getElementById('fixedDisplay').innerText = `📌 ${week} - يوم ${day}`;

  document.getElementById('page1').classList.remove('active');
  document.getElementById('page2').classList.add('active');
  window.scrollTo(0, 0);
}

function prevPage() {
  document.getElementById('page2').classList.remove('active');
  document.getElementById('page1').classList.add('active');
  window.scrollTo(0, 0);
}

function sendData() {
  const loading = document.getElementById('loadingOverlay');
  const form = document.getElementById('trackerForm');
  
  loading.style.display = 'block';

  const formData = new FormData(form);
  const searchParams = new URLSearchParams();

  for (const pair of formData.entries()) {
    searchParams.append(pair[0], pair[1]);
  }

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: searchParams.toString()
  })
  .then(() => {
    loading.style.display = 'none';
    alert('✨ تم حفظ وإرسال البيانات بنجاح في Google Sheets!');
    form.reset();
    document.getElementById('cycleNote').style.display = 'none';
    document.getElementById('waterNote').style.display = 'none';
    prevPage();
  })
  .catch(error => {
    loading.style.display = 'none';
    alert('حدث خطأ أثناء الإرسال: ' + error.message);
  });
}