export const setupStyles = () => ({
  ...defaultStyle(),
  ...styles()
})

const defaultStyle = () => ({
  defaultStyle: {
    font: 'NotoSerif',
    fontSize: 11,
    lineHeight: 0.8
  }
})

const styles = () => ({
  styles: {
    italic: {
      font: 'Merriweather',
      lineHeight: 1,
      italics: true
    },
    gray: {
      color: 'gray'
    },
    fullName: {
      font: 'Merriweather',
      lineHeight: 1,
      fontSize: 22,
      bold: true
    },
    jobTitle: {
      font: 'Merriweather',
      lineHeight: 1,
      fontSize: 16,
      color: 'gray'
    },
    sectionTitle: {
      font: 'Merriweather',
      lineHeight: 1,
      fontSize: 14,
      bold: true
    },
    subSectionTitle: {
      font: 'Merriweather',
      lineHeight: 1,
      fontSize: 12,
      bold: true
    },
    mt6: {
      marginTop: 6
    },
    mt10: {
      marginTop: 10
    }
  }
})

export const hr = () => ({
  table : {
    widths: ['100%'],
    body : [[''], ['']]
  },
  layout : {
    hLineWidth(i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0
      }
      return 1
    },
    vLineWidth() {
      return 0
    },
    hLineColor() {
      return '#eee'
    },
  },
  margin: [0, 24, 0, 24],
})