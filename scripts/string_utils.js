/**
 * removes all trailing spaces and if space occurs more than once in a row changes it into one space
 * @param word
 */
function removeRedundantSpaces(word)
{
    word = word.trim();

    while (word.indexOf("  ") > -1)
    {
        word = removeDoubleSpace(word);
    }

    return word;
}



function removeDoubleSpace(word)
{
    return word.replace("  ", " ");
}