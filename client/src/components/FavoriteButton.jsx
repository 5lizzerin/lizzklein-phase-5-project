import React, {useState} from "react";
import { Button } from '@chakra-ui/react';

function FavoriteButton({ combo, id }){
    const [favorited, setFavorited] = useState(false);

    function handleFavorite(){
        console.log("i was clicked!")
        setFavorited(!favorited);

        fetch("/allcombinations"+id,
        {
            method: "PATCH",
            headers: {
                "Content-type": "application/JSON"
            },
            body: JSON.stringify({favorited:!favorited})
        }).then((r)=>r.json())
        return
    }
    return (
        <Button
            margin="20px"
            colorScheme={favorited ? "teal" : "gray"}
            onClick={handleFavorite}
        >
          {favorited ? "Remove" : "Favorite"}
        </Button>
      );
};





export default FavoriteButton;