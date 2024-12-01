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

let selectedCupcakes = {}; // Object lưu số lượng bánh đã chọn

// Cập nhật danh sách bánh đã chọn và lưu vào localStorage
function updateSelectedItems() {
    localStorage.setItem('selectedCupcakes', JSON.stringify(selectedCupcakes));

    const selectedItemsList = document.getElementById('selected-items-list');
    selectedItemsList.innerHTML = ''; // Xóa danh sách cũ

    for (const cupcake in selectedCupcakes) {
        const li = document.createElement('li');
        const cupcakeImg = document.createElement('img');
        cupcakeImg.src = `images/cupcakes/${cupcake}.jpg`;
        cupcakeImg.alt = cupcake;

        const quantity = document.createElement('span');
        quantity.textContent = `x${selectedCupcakes[cupcake]}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.classList.add('remove');
        removeBtn.addEventListener('click', () => {
            delete selectedCupcakes[cupcake];
            const slide = document.querySelector(`[data-cupcake="${cupcake}"]`);
            if (slide) slide.classList.remove('selected');
            updateSelectedItems();
        });

        li.appendChild(cupcakeImg);
        li.appendChild(quantity);
        li.appendChild(removeBtn);
        selectedItemsList.appendChild(li);
    }
}

// Xử lý sự kiện khi chọn bánh
document.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        const cupcake = slide.dataset.cupcake;

        if (!selectedCupcakes[cupcake]) {
            selectedCupcakes[cupcake] = 1;
        } else {
            selectedCupcakes[cupcake]++;
        }

        slide.classList.add('selected');
        updateSelectedItems();
    });
});

// Khôi phục dữ liệu khi quay lại trang
document.addEventListener('DOMContentLoaded', () => {
    const storedCupcakes = localStorage.getItem('selectedCupcakes');
    if (storedCupcakes) {
        selectedCupcakes = JSON.parse(storedCupcakes);

        const selectedItemsList = document.getElementById('selected-items-list');
        for (const cupcake in selectedCupcakes) {
            const li = document.createElement('li');
            const cupcakeImg = document.createElement('img');
            cupcakeImg.src = `images/cupcakes/${cupcake}.jpg`;
            cupcakeImg.alt = cupcake;

            const quantity = document.createElement('span');
            quantity.textContent = `x${selectedCupcakes[cupcake]}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            removeBtn.classList.add('remove');
            removeBtn.addEventListener('click', () => {
                delete selectedCupcakes[cupcake];
                const slide = document.querySelector(`[data-cupcake="${cupcake}"]`);
                if (slide) slide.classList.remove('selected');
                updateSelectedItems();
            });

            li.appendChild(cupcakeImg);
            li.appendChild(quantity);
            li.appendChild(removeBtn);
            selectedItemsList.appendChild(li);

            // Thêm hiệu ứng đã chọn cho các slide
            const slide = document.querySelector(`[data-cupcake="${cupcake}"]`);
            if (slide) slide.classList.add('selected');
        }
    }
});

function goToChonHop() {
    window.location.href = "chonhop.html";
}
