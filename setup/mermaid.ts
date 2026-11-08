import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(async () => {
  // Mermaid measures labels before drawing; use the bundled face for those metrics.
  await document.fonts.load('400 18px "Noto Sans KR Variable"', 'Logic Gate 상태 입력 출력')
  return {
  theme: 'base',
  fontFamily: 'Noto Sans KR Variable, Malgun Gothic, sans-serif',
  themeVariables: {
    darkMode: false,
    background: '#F7F5EF',
    primaryColor: '#FFFFFF',
    primaryTextColor: '#26343C',
    primaryBorderColor: '#536068',
    secondaryColor: '#EEECE5',
    secondaryTextColor: '#26343C',
    tertiaryColor: '#F7F5EF',
    tertiaryTextColor: '#26343C',
    lineColor: '#536068',
    textColor: '#26343C',
    edgeLabelBackground: '#F7F5EF',
    nodeTextColor: '#26343C',
    nodeBorder: '#536068',
    mainBkg: '#FFFFFF',
    clusterBkg: '#EEECE5',
    clusterBorder: '#536068',
    stateBkg: '#FFFFFF',
    stateBorder: '#536068',
    // Mermaid otherwise derives stateLabelColor from stateBkg (white).
    stateLabelColor: '#26343C',
    labelColor: '#26343C',
    transitionLabelColor: '#26343C',
    labelBackgroundColor: '#F7F5EF',
    noteBkgColor: '#EEECE5',
    noteTextColor: '#26343C',
    noteBorderColor: '#536068',
    transitionColor: '#536068',
    fontFamily: 'Noto Sans KR Variable, Malgun Gothic, sans-serif',
    fontSize: '18px',
  },
  }
})
