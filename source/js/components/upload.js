const formParrent = document.querySelector('.calculate__box--mid');
const previewParrent = document.querySelector('.calculate__upload-files');

// function bytesToSize(bytes) {
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
//   if (!bytes) {
//     return '0 Byte'
//   }
//   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
//   return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
// }

const element = (tag, classes = [], content) => {
  const node = document.createElement(tag)

  if (classes.length) {
    node.classList.add(...classes)
  }

  if (content) {
    node.textContent = content
  }

  return node
}

export function upload(selector, options = {}) {
  let files = []
  const input = document.querySelector(selector)
  if (!input) {
    return
  }

  const previewContainer = document.querySelector('.calculate__upload-files');
  const preview = element('div', ['preview'])

  if (options.multi) {
      input.setAttribute('multiple', true)

  }

  if (options.accept && Array.isArray(options.accept)) {
      input.setAttribute('accept', options.accept.join(','))
  }

  previewContainer.insertAdjacentElement('beforeend', preview)

  const changeHandler = event => {
    if (!event.target.files.length) {
      return
    }

    files = [...files, ...Array.from(event.target.files)]
    preview.innerHTML = '';


    files.forEach(file => {
      if (!file.type.match('pdf')) {
        return
      }

      const reader = new FileReader()

      reader.onload = ev => {
        const src = ev.target.result
        preview.insertAdjacentHTML('afterbegin', `
            <div class="preview__card">
              <div class="preview__card-select basket-choosed"></div>
              <div class="preview__print-type basket-choosed">Standart</div>
              <div class="preview__card-details">
                <div class="preview__details-image">
                  <picture>
                    <source type='image/webp' srcset='img/preview.webp'>
                    <img width='110' height='140' src='img/preview.png' alt='preview'>
                  </picture>
                </div>
                <div class="preview__details-info">
                  <div class="preview__details-title basket-tabs-content">My file about new design on my website.pdf</div>

                  <div class="preview__order-price">
                    <div class="basket__order-count">
                        <span class="basket__count-btn basket__count-btn--minus">
                            <svg width='9' height='9'>
                                <use href='img/sprite/sprite.svg#basket-minus'></use>
                            </svg>
                        </span>
                        <span class="basket__count basket-count">1</span>
                        <span class="basket__count-btn basket__count-btn--plus">
                            <svg width='9' height='9'>
                                <use href='img/sprite/sprite.svg#basket-plus'></use>
                            </svg>
                        </span>
                      </div>
                      <div class="basket__count-price text-basket">0,45 €</div>
                    </div>

                    <ul class="preview__details-list">
                      <li class="preview__details-item">
                        <svg width='14' height='14'>
                          <use href='img/sprite/sprite.svg#color'></use>
                        </svg>
                        <span class="basket-choosed">BN</span>
                      </li>
                      <li class="preview__details-item">
                        <svg width='14' height='14'>
                          <use href='img/sprite/sprite.svg#size'></use>
                        </svg>
                        <span class="basket-choosed">A4</span>
                      </li>
                      <li class="preview__details-item">
                        <svg width='14' height='14'>
                          <use href='img/sprite/sprite.svg#thickness'></use>
                        </svg>
                        <span class="basket-choosed">80 GR</span>
                      </li>
                      <li class="preview__details-item">
                        <svg width='14' height='14'>
                          <use href='img/sprite/sprite.svg#per-slide'></use>
                        </svg>
                        <span class="basket-choosed">Normal</span>
                      </li>
                      <li class="preview__details-item">
                        <svg width='14' height='14'>
                          <use href='img/sprite/sprite.svg#orientation'></use>
                        </svg>
                        <span class="basket-choosed">Automatic</span>
                      </li>
                      <li class="preview__details-item">
                        <svg width='14' height='14'>
                          <use href='img/sprite/sprite.svg#quality'></use>
                        </svg>
                        <span class="basket-choosed">Inkjet</span>
                      </li>
                      <li class="preview__details-item">
                        <svg width='14' height='14'>
                          <use href='img/sprite/sprite.svg#binding'></use>
                        </svg>
                        <span class="basket-choosed">Unfinished</span>
                      </li>
                    </ul>
                </div>
              </div>

              <div class="preview__btns">
                <button class="preview__btn-delete btn button-1">
                  <svg width='24' height='24'>
                    <use href='img/sprite/sprite.svg#delete'></use>
                  </svg>
                  <span>Delete</span>
                </button>
                <button class="preview__btn-test btn button-1" data-path="test">
                  <svg width='24' height='24'>
                    <use href='img/sprite/sprite.svg#order'></use>
                  </svg>
                  <span>Test print online</span>
                </button>
              </div>
          </div>
        `);
        formParrent.classList.add('has-file');
        previewParrent.classList.add('active');
      }

      reader.readAsDataURL(file)
    })
  }

  const removeHandler = event => {
    if (!event.target.dataset.name) {
      return
    }

    const {name} = event.target.dataset
    files = files.filter(file => file.name !== name)

    const block = preview
      .querySelector(`[data-name="${name}"]`)
      .closest('.preview-image')

    block.classList.add('removing')
    setTimeout(() => block.remove(), 300)
  }

  const clearPreview = el => {
    el.style.bottom = '4px'
    el.innerHTML = '<div class="preview-info-progress"></div>'

    preview.querySelectorAll('.preview-remove').forEach(function(e){
      e.remove()
      console.log(e)
    } )

    const previewInfo = preview.querySelectorAll('.preview-info')
    previewInfo.forEach(clearPreview)
  }

  input.addEventListener('change', changeHandler)
  preview.addEventListener('click', removeHandler)
}


upload('#file', {
  multi: true,
  accept: ['.pdf']
})
