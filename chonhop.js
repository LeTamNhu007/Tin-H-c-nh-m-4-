// Khởi tạo swiper
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Biến lưu danh sách hộp đã chọn
let selectedBoxes = {};

// Cập nhật danh sách hộp đã chọn và lưu vào localStorage
function updateSelectedItems() {
    localStorage.setItem('selectedBoxes', JSON.stringify(selectedBoxes));

    const selectedItemsList = document.getElementById('selected-items-list');
    selectedItemsList.innerHTML = ''; // Xóa danh sách cũ

    for (const box in selectedBoxes) {
        const li = document.createElement('li');
        const boxImg = document.createElement('img');
        boxImg.src = `images/boxes/${box}.jpg`;
        boxImg.alt = box;

        const quantity = document.createElement('span');
        quantity.textContent = `x${selectedBoxes[box]}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.classList.add('remove');
        removeBtn.addEventListener('click', () => {
            delete selectedBoxes[box];
            const slide = document.querySelector(`[data-box="${box}"]`);
            if (slide) slide.classList.remove('selected');
            updateSelectedItems();
        });

        li.appendChild(boxImg);
        li.appendChild(quantity);
        li.appendChild(removeBtn);
        selectedItemsList.appendChild(li);
    }
}

// Xử lý sự kiện khi chọn hộp
document.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        const box = slide.dataset.box;

        if (!selectedBoxes[box]) {
            selectedBoxes[box] = 1;
        } else {
            selectedBoxes[box]++;
        }

        slide.classList.add('selected');
        updateSelectedItems();
    });
});

// Khôi phục dữ liệu khi quay lại trang
document.addEventListener('DOMContentLoaded', () => {
    const storedBoxes = localStorage.getItem('selectedBoxes');
    if (storedBoxes) {
        selectedBoxes = JSON.parse(storedBoxes);

        const selectedItemsList = document.getElementById('selected-items-list');
        for (const box in selectedBoxes) {
            const li = document.createElement('li');
            const boxImg = document.createElement('img');
            boxImg.src = `images/boxes/${box}.jpg`;
            boxImg.alt = box;

            const quantity = document.createElement('span');
            quantity.textContent = `x${selectedBoxes[box]}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            removeBtn.classList.add('remove');
            removeBtn.addEventListener('click', () => {
                delete selectedBoxes[box];
                const slide = document.querySelector(`[data-box="${box}"]`);
                if (slide) slide.classList.remove('selected');
                updateSelectedItems();
            });

            li.appendChild(boxImg);
            li.appendChild(quantity);
            li.appendChild(removeBtn);
            selectedItemsList.appendChild(li);

            // Thêm hiệu ứng đã chọn cho các slide
            const slide = document.querySelector(`[data-box="${box}"]`);
            if (slide) slide.classList.add('selected');
        }
    }
});

// Hàm chuyển đến trang chọn bánh
function goToChonBanh() {
    window.location.href = "chonbanh.html";
}
