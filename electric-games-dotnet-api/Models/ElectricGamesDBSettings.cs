namespace ElectricGamesApi.Models;

public class ElectricGamesDBSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string GamesCollection { get; set; } = null!;
    public string CharacterCollection { get; set; } = null!;
}