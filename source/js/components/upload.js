const formParrent = document.querySelector('.calculate__box--mid');
const previewParrent = document.querySelector('.calculate__upload-files');

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

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
          <div class="preview-image">
            <div class="preview-remove" data-name="${file.name}">&times;</div>
            <img src="${src}" alt="${file.name}" />
            <div class="preview-info">
              <span>${file.name}</span>
              ${bytesToSize(file.size)}
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
