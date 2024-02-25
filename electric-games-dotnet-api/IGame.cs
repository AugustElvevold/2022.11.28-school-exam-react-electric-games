namespace ElectricGamesApi;

public interface IGame
{
    public string title { get; set; }
    public string platform { get; set; }
    public string release_year { get; set; }
    public string image { get; set; }
}
