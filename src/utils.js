import da from "element-ui/src/locale/lang/da";

export const Storage = {
  get(key) {
    let val = localStorage.getItem(key)
    return val ? JSON.parse(val) : ''
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  addItem(key, item) {
    let list = this.get(key) || []
    list.unshift(item)
    this.set(key, list)
    return list
  },
  deleteItemBy(key, itemKey, val) {
    let list = this.get(key)
    if (list && list.length) {
      let i = list.findIndex(_it => _it[itemKey] === val)
      if (i > -1) list.splice(i, 1)
      this.set(key, list)
    }
    return list
  },
}

function getPacScript(hostInfoList) {
  var script = ''
  let results = hostInfoList.filter(it => it.enable)
  for (var i = 0; i < results.length; i++) {
    let info = results[i]
    script += (i === 0 ? 'if' : 'else if')
    if (info.domain.indexOf('/') > 0) {
      script += '(shExpMatch(url, "http://' + info.domain + '") || shExpMatch(url, "https://' + info.domain + '"))'
    } else if (info.domain.indexOf('*') > -1) {
      script += '(shExpMatch(host, "' + info.domain + '"))'
    } else {
      script += '(host == "' + info.domain + '")'
    }
    script += '{return "PROXY ' + info.target + '; DIRECT";}\n'
  }
  if (script) script += 'else { return "DIRECT"; }'

  let data = `
      function FindProxyForURL(url,host){
        if(shExpMatch(url, "http:*") || shExpMatch(url, "https:*")){
          ${script}
        } else {
          return "DIRECT";
        }
      }
  `

  console.log(`-------->>>> getPacScript\n`, data)

  return data
}

export function setProxy(enable, hostInfoList) {
  if (enable === undefined) {
    enable = Storage.get('enable')
    if (enable === '') enable = true
    else if (enable === false) return
  } else {
    Storage.set('enable', enable)
  }

  let config = {mode: 'system'};
  if(enable) {
    config = {
      mode: 'pac_script',
      pacScript: {
        data: getPacScript(hostInfoList)
      }
    };
  }

  window.chrome.proxy.settings.set({scope: 'regular', value: config})
}

export function decodeRules(bulkRules) {
  let items = bulkRules.split('\n')
  let reg = /^\s*([^\s]+)\s*([^\s]+)?\s*([^\s]+)?\s*([^\s]+)?\s*([^\s]+)?\s*$/
  let _items = []
  if (items.length) {
    items.forEach((it, i) => {
      it = it.trim()
      if (it && it.indexOf('#') !== 0) {
        let attrs = reg.exec(it)
        if (attrs && attrs[1] && attrs[2]) {
          let tags = attrs[3]
          let order = attrs[4]
          let note = attrs[5]
          if (tags && !note) { // 根据规则：order 必须为数值，处理缺省设置
            if (!isNaN(Number(tags))) {
              tags = ''
              order = attrs[3]
              note = attrs[4]
            } else if (isNaN(Number(order))) {
              order = 0
              note = attrs[4]
            }
          }
          let item = {
            id: new Date().getTime() + '-' + i,
            domain: attrs[1],
            target: attrs[2],
            tags,
            order: Number(order) || 0,
            note: note || '',
            create_at: new Date().getTime(),
          }
          item.tags = item.tags ? item.tags.replace(/,\s/g, ',').replace(/\s+/g, ',').split(',') : []

          _items.push(item)
        }
      }
    })
  }
  return _items
}
