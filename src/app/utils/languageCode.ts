const generateLanguageCode = (language: string) => {
    switch (language) {
      case 'african language':
        return '1 ';
      case 'albanian':
        return 'L ';
      case 'arabic':
        return 'A ';
      case 'chinese-cantonese':
        return '2 ';
      case 'chinese-mandarin':
        return 'C ';
      case 'chinese-other':
        return '3 ';
      case 'chinese traditional':
        return 'CT';
      case 'chinese simplified':
        return 'CS';
      case 'english':
        return 'E ';
      case 'farsi':
        return 'Q ';
      case 'french':
        return 'F ';
      case 'french creole':
        return 'D ';
      case 'german':
        return 'M ';
      case 'greek':
        return 'G ';
      case 'hebrew':
        return 'H ';
      case 'hindi':
        return 'N ';
      case 'italian':
        return 'I ';
      case 'japanese':
        return 'J ';
      case 'khmer':
        return 'W ';
      case 'korean':
        return 'K ';
      case 'laotian/lao':
        return '8 ';
      case 'native american':
        return '4 ';
      case 'polish':
        return 'P ';
      case 'portuguese':
        return 'Z ';
      case 'russian':
        return 'R ';
      case 'serbo-croatian':
        return '5 ';
      case 'sign language':
        return '9 ';
      case 'spanish':
        return 'S ';
      case 'swedish':
        return '6 ';
      case 'tagalog':
        return '7 ';
      case 'thai':
        return 'T ';
      case 'urdu':
        return 'B ';
      case 'vietnamese':
        return 'V ';
      case 'yiddish':
        return 'Y ';
      case 'alaskan':
        return 'AN';
      case 'am ind-apache':
        return 'AA';
      case 'am ind-crow':
        return 'AE';
      case 'am ind-dakota':
        return 'AI';
      case 'am ind-choctaw':
        return 'AC';
      default:
        return 'E ';
    }
  };

export { generateLanguageCode };
