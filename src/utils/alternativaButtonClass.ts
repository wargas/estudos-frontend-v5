export default function  alternativaButtonClass(
    letra: string,
    selecionada?: string,
    gabarito?: string,
    resposta?: string
  ) {
    if (gabarito) {
      if (letra === gabarito && letra === resposta) {
        return "bg-green-500 border-green-500 text-white";
      }
      if (letra === resposta && letra !== gabarito) {
        return gabarito === 'X' ? "bg-yellow-500 border-yellow-500 text-white" : "bg-red-500 border-red-500 text-white";
      }

      if (letra === gabarito && gabarito !== resposta) {
        return "border-green-500 text-green-600";
      }
    } else {
      if (letra === selecionada) {
        return "bg-gray-400 border-gray-400 text-gray-100 shadow";
      } else {
        return "bg-gray-100 border-gray-100 text-gray-400";
      }
    }

    return 'bg-gray-100 border-gray-100 text-gray-400'
  }