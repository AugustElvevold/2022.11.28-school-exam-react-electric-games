using ElectricGamesApi;
using ElectricGamesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameStoreApi.Controllers;

// GAMES

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly ILogger<GamesController> _logger;
    private readonly GamesService _gamesService;
    private readonly IWebHostEnvironment _hosting;
    public GamesController(ILogger<GamesController> logger,
    GamesService gamesService, 
    IWebHostEnvironment hosting)
    {
        _logger = logger;
        _gamesService = gamesService;
        _hosting = hosting;
    }

    [HttpGet]
    public ActionResult<List<Game>> Get() {
        return _gamesService.Get();
    }

    [HttpGet("{id:length(24)}")]
    public ActionResult<Game> Get(string id)
    {
        var game = _gamesService.Get(id);
        if (game is null)
        {
            return NotFound();
        }
        return game;
    }

    [HttpGet("search/{searchWord}")]
    public ActionResult<List<Game>> GetByName(string searchWord)
    {
        List<Game> allGames = _gamesService.Get();

        // returns a game if the searchword is in any of title, platform or release year.
        List<Game> gamesBySearchWord = allGames.Where(game=>
            game.id.ToLower().Contains(searchWord.ToLower()) ||
            game.title.ToLower().Contains(searchWord.ToLower()) ||
            game.platform.ToLower().Contains(searchWord.ToLower()) ||
            game.release_year.ToLower().Contains(searchWord.ToLower())
        ).ToList();
        if(gamesBySearchWord == null) {
            return NoContent(); 
        }
        return gamesBySearchWord;
    }

    [HttpPost]
    public IActionResult Post(Game newGame)
    {
        _gamesService.Create(newGame);

        return CreatedAtAction(nameof(Post), new { id = newGame.id }, newGame);
    }

    [HttpPost]
    [Route("[action]")]
    public IActionResult UploadImage(IFormFile file)
    {
        string webrootPath= _hosting.WebRootPath;
        string imagePath = Path.Combine($"{webrootPath}/images/games/{file.FileName}");
        Console.Write(imagePath);
        using(var fileStream= new FileStream(imagePath, FileMode.Create)) {
            file.CopyTo(fileStream);
        }
        return Ok();
    }

    [HttpPut("{id:length(24)}")]
    public IActionResult Update(string id, Game updatedGame)
    {
        var game = _gamesService.Get(id);

        if (game is null)
        {
            return NotFound();
        }

        updatedGame.id = game.id;

        _gamesService.Update(id, updatedGame);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public IActionResult Delete(string id)
    {
        var game = _gamesService.Get(id);

        if (game is null)
        {
            return NotFound();
        }

        _gamesService.Remove(id);

        return NoContent();
    }
}

// CHARACTERS

[ApiController]
[Route("api/[controller]")]
public class CharactersController : ControllerBase
{

    private readonly ILogger<CharactersController> _logger;
    private readonly CharacterService _characterService;
    private readonly IWebHostEnvironment _hosting;
    public CharactersController(ILogger<CharactersController> logger,
    CharacterService characterService, 
    IWebHostEnvironment hosting)
    {
        _logger = logger;
        _characterService = characterService;
        _hosting = hosting;
    }

    [HttpGet]
    public ActionResult<List<Character>> Get() {
        return _characterService.Get();
    }
    [HttpGet("{id:length(24)}")]
    public ActionResult<Character> Get(string id)
    {
        var character = _characterService.Get(id);
        if (character is null)
        {
            return NotFound();
        }
        return character;
    }

    [HttpGet("search/{searchWord}")]
    public ActionResult<List<Character>> GetByName(string searchWord)
    {
        List<Character> allCharacters = _characterService.Get();

        // returns a character if the searchword is in any of title, platform or release year.
        List<Character> charactersBySearchWord = allCharacters.Where(character=>
            character.id.ToLower().Contains(searchWord.ToLower()) ||
            character.name.ToLower().Contains(searchWord.ToLower()) ||
            character.game.ToLower().Contains(searchWord.ToLower())
        ).ToList();
        if(charactersBySearchWord == null) {
            return NoContent(); 
        }
        return charactersBySearchWord;
    }

    [HttpPost]
    public IActionResult Post(Character newCharacter)
    {
        _characterService.Create(newCharacter);

        return CreatedAtAction(nameof(Post), new { id = newCharacter.id }, newCharacter);
    }

    [HttpPost]
    [Route("[action]")]
    public IActionResult UploadImage(IFormFile file)
    {
        string webrootPath= _hosting.WebRootPath;
        string imagePath = Path.Combine($"{webrootPath}/images/characters/{file.FileName}");
        Console.Write(imagePath);
        using(var fileStream= new FileStream(imagePath, FileMode.Create)) {
            file.CopyTo(fileStream);
        }
        return Ok();
    }

    [HttpPut("{id:length(24)}")]
    public IActionResult Update(string id, Character updatedCharacter)
    {
        var character = _characterService.Get(id);

        if (character is null)
        {
            return NotFound();
        }

        updatedCharacter.id = character.id;

        _characterService.Update(id, updatedCharacter);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public IActionResult Delete(string id)
    {
        var character = _characterService.Get(id);

        if (character is null)
        {
            return NotFound();
        }

        _characterService.Remove(id);

        return NoContent();
    }
}