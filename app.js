/**
 * Fonksiyon 1 - Verilen kelimeyi dizide bulma.
 * @param {Array.<string>} data - Harfleri içeren string array. Örn: ["DALN","LIMO","KASA"]
 * @param {string} word - Aranacak kelime. Örn: "DAL"
 * @returns {Array.<{i: Number, j: Number}>}  - Örn: [ {i: 0, j: 0}, {i: 0, j: 1}, {i: 0, j: 2} ]
 * @description Fonksiyondan dönen obje dizisinde konum bilgileri sıralı yer almalıdır.
 * 'i' satır numarasını, j ise sutün numarasını temsil etmektedir.
 */
function find(data, word) {
  const positions = [];
  const numRows = data.length;
  const numCols = data[0].length;
  // matristeki her hücreyi yineleme
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // kelimenin ilk harfi (i,j)'deki hücreyle eşleşiyorsa
      if (data[i][j] === word[0]) {
        //4 yönde de bu hücreden başlayarak kelimeyi bulmaya çalışmak
        const directions = [
          [1, 0], // down
          [0, 1], // right
          [-1, 0], // up
          [0, -1], // left
        ];
        for (const [di, dj] of directions) {
          // (i,j)'den başlayarak (di,dj) yönünde ilerleniyor
          let found = true;
          const positionsInDirection = [{ i, j }];
          for (let k = 1; k < word.length; k++) {
            const ii = i + k * di;
            const jj = j + k * dj;
            if (
              ii < 0 ||
              ii >= numRows ||
              jj < 0 ||
              jj >= numCols ||
              data[ii][jj] !== word[k]
            ) {
              // sınırların dışına çıkarsak veya mevcut harf kelimedeki karşılık gelen harfle eşleşmiyorsa aramayı durdur
              found = false;
              break;
            } else {
              // mevcut pozisyonu pozisyonlar listesine ekle
              positionsInDirection.push({ i: ii, j: jj });
            }
          }
          if (found) {
            // kelimeyi bulursak pozisyonları döndür
            positions.push(...positionsInDirection);
            // kelimenin harflerini matristen sil
            for (const { i, j } of positionsInDirection) {
              data[i] =
                data[i].substring(0, j) + " " + data[i].substring(j + 1);
            }
            // başka yönlerde aramayı bırak
            break;
          }
        }
      }
    }
  }
  // konumları alfabe sırasına göre sırala
  positions.sort((a, b) => a.i - b.i || a.j - b.j);
  return positions;
}

/**
 * Fonksiyon 2 - İstenilen kelimeyi diziye ekleme.
 * @param {Array.<string>} data - Harfleri içeren string array. Örn: ["   N","LIMO","KASA"]
 * @returns {Array.<string>}  - Örn: ["AABF","IKLM","NOPS"]
 * @description Boşluklar string içinde ' ' şeklinde bulunmaktadır.
 * Verilen örnekte ilk satırda 3 adet boşluk ve sonrasında 'N' harfi bulunmaktadır.
 * Boşluklar eşsiz harfler ile doldurulmalıdır.
 * Örnek: ["BFPN","LIMO","KASA"]
 * Sonrasında bu array alfabetik sıraya göre sıralanmalıdır ve sıralanan array döndürülmelidir.
 * Örnek: ["AABF","IKLM","NOPS"]
 */
function getNewData(data) {
  // Boşlukları eşsiz harflerle doldur
  const usedLetters = new Set();
  const newData = data.map((row) => {
    let newRow = "";
    for (let i = 0; i < row.length; i++) {
      if (row[i] === " ") {
        let newLetter = "";
        do {
          let randomValues = new Uint32Array(1);
          window.crypto.getRandomValues(randomValues);
          newLetter = String.fromCharCode((randomValues[0] % 26) + 65);
        } while (usedLetters.has(newLetter));
        usedLetters.add(newLetter);
        newRow += newLetter;
      } else {
        newRow += row[i];
      }
    }
    return newRow;
  });

  // Alfabetik sıraya göre sırala
  newData.sort();

  return newData;
}

export { find, getNewData };
