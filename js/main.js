(function() {
  const $inputPostcard = document.querySelector('#sender-file-postcard')
  const $btnSenderNext = document.querySelector('#sender-next')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      document.myForm.latitude.value = position.coords.latitude;
      document.myForm.longitude.value = position.coords.longitude;
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  document.querySelectorAll('.mdl-navigation__link').forEach($link => {
    $link.addEventListener('click', function() {
      const href = this.getAttribute('href');
      document.querySelector(`.mdl-tabs__tab[href="${href}"]`).click()
      document.querySelector('.mdl-layout__obfuscator').click()
    })
  })
  $btnSenderNext.addEventListener('click', () => {
    document.querySelector(`.mdl-tabs__tab[href="#asset-panel"]`).click()
  })

  document.querySelectorAll('.file-image').forEach(($fileImage) => {
    $fileImage.addEventListener('click', function () {
      const name = this.dataset.name
      document.querySelector(`input[name="${name}"]`).click()
    })
  })

  document.querySelectorAll('input[type="file"]').forEach(($inputFile) => {
    $inputFile.addEventListener('change', function () {
      const $input = this
      const type = this.getAttribute('name')
      if (this.files) {
        if (type !== 'postcard') {
          document.querySelectorAll(`.${type}-preview`).forEach(($ele) => {
            $ele.parentElement.removeChild($ele)
          })
        }
        for (let i = 0; i < this.files.length; i += 1) {
          const file = this.files[i]
          const reader = new FileReader();

          reader.onload = function (e) {
            if (type === 'postcard') {
              const $preview = document.querySelector(`.${type}-preview-${i}`)
              if ($preview) {
                $preview.src = e.target.result
              }
              $btnSenderNext.classList.remove('is-hidden')
            } else if (type === 'image') {
              const $preview = document.querySelector(`.${type}-preview-${i}`)
              if ($preview) {
                $preview.src = e.target.result
              }
            } else if (type === 'video') {
              const $preview = document.querySelector(`.${type}-preview-${i}`)
              if ($preview) {
                $preview.textContent = file.name
              }
            }
          }
          if (type === 'image') {
            const $ele = document.createElement('img')
            $ele.classList.add('image-preview', `image-preview-${i}`, 'full-width')
            insertAfter($ele, $input)
          } else if (type === 'video') {
            const $ele = document.createElement('span')
            $ele.classList.add('video-preview', `video-preview-${i}`)
            insertAfter($ele, $input)
          }
          reader.readAsDataURL(file);
        }
      }
    })
  })

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
})()
