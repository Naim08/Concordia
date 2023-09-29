# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
# #   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Server.destroy_all
  Channel.destroy_all
  Message.destroy_all
  Membership.destroy_all
  Conversation.destroy_all
  ConversationParticipant.destroy_all
  DirectMessage.destroy_all
  Friend.destroy_all
  FriendRequest.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!("users")
  ApplicationRecord.connection.reset_pk_sequence!("servers")
  ApplicationRecord.connection.reset_pk_sequence!("channels")
  ApplicationRecord.connection.reset_pk_sequence!("messages")
  ApplicationRecord.connection.reset_pk_sequence!("memberships")
  ApplicationRecord.connection.reset_pk_sequence!("conversations")
  ApplicationRecord.connection.reset_pk_sequence!("conversation_participants")
  ApplicationRecord.connection.reset_pk_sequence!("direct_messages")
  ApplicationRecord.connection.reset_pk_sequence!("friends")
  ApplicationRecord.connection.reset_pk_sequence!("friend_requests")

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  champions = [
    { name: "Ahri", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg" },
    { name: "Akali", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg" },
    { name: "Aatrox", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" },
    { name: "Alistar", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_0.jpg" },

    { name: "Amumu", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Amumu_0.jpg" },
    { name: "Anivia", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Anivia_0.jpg" },
    { name: "Annie", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Annie_0.jpg" },
    { name: "Aphelios", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aphelios_0.jpg" },
    { name: "Ashe", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_0.jpg" },
    { name: "Aurelion Sol", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/AurelionSol_0.jpg" },
    { name: "Azir", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg" },
    { name: "Bard", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Bard_0.jpg" },
    { name: "Blitzcrank", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_0.jpg" },
    { name: "Brand", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Brand_0.jpg" },
    { name: "Braum", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Braum_0.jpg" },
    { name: "Caitlyn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_0.jpg" },
    { name: "Camille", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Camille_0.jpg" },
    { name: "Cassiopeia", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Cassiopeia_0.jpg" },
    { name: "Cho'Gath", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Chogath_0.jpg" },
    { name: "Corki", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Corki_0.jpg" },
    { name: "Darius", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg" },
    { name: "Diana", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Diana_0.jpg" },
    { name: "Dr. Mundo", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/DrMundo_0.jpg" },
    { name: "Draven", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Draven_0.jpg" },
    { name: "Ekko", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_0.jpg" },
    { name: "Elise", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Elise_0.jpg" },
    { name: "Evelynn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_0.jpg" },
    { name: "Ezreal", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ezreal_0.jpg" },
    { name: "Fiddlesticks", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiddlesticks_0.jpg" },
    { name: "Fiora", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_0.jpg" },

    { name: "Fizz", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fizz_0.jpg" },
    { name: "Galio", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Galio_0.jpg" },
    { name: "Gangplank", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg" },
    { name: "Garen", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg" },
    { name: "Gnar", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gnar_0.jpg" },
    { name: "Gragas", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_0.jpg" },
    { name: "Graves", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Graves_0.jpg" },
    { name: "Gwen", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg" },
    { name: "Hecarim", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Hecarim_0.jpg" },
    { name: "Heimerdinger", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Heimerdinger_0.jpg" },
    { name: "Illaoi", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Illaoi_0.jpg" },
    { name: "Irelia", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Irelia_0.jpg" },
    { name: "Ivern", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" },
    { name: "Janna", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Janna_0.jpg" },
    { name: "Jarvan IV", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_0.jpg" },
    { name: "Jax", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_0.jpg" },
    { name: "Jayce", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_0.jpg" },
    { name: "Jhin", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_0.jpg" },
    { name: "Jinx", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg" },
    { name: "Kai'Sa", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_0.jpg" },
    { name: "Kalista", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kalista_0.jpg" },
    { name: "Karma", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Karma_0.jpg" },
    { name: "Karthus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Karthus_0.jpg" },
    { name: "Kassadin", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kassadin_0.jpg" },
    { name: "Katarina", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Katarina_0.jpg" },
    { name: "Kayle", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayle_0.jpg" },
    { name: "Kayn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayn_0.jpg" },
    { name: "Kennen", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kennen_0.jpg" },
    { name: "Kha'Zix", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Khazix_0.jpg" },
    { name: "Kindred", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kindred_0.jpg" },
    { name: "Kled", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kled_0.jpg" },
    { name: "Kog'Maw", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/KogMaw_0.jpg" },
    { name: "LeBlanc", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leblanc_0.jpg" },
    { name: "Lee Sin", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg" },
    { name: "Leona", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_0.jpg" },
    { name: "Lillia", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lillia_0.jpg" },
    { name: "Lissandra", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lissandra_0.jpg" },
    { name: "Lucian", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lucian_0.jpg" },
    { name: "Lulu", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lulu_0.jpg" },
    { name: "Lux", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg" },
    { name: "Malphite", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Malphite_0.jpg" },
    { name: "Malzahar", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Malzahar_0.jpg" },
    { name: "Maokai", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Maokai_0.jpg" },
    { name: "Master Yi", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_0.jpg" },
    { name: "Miss Fortune", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MissFortune_0.jpg" },
    { name: "Mordekaiser", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg" },
    { name: "Morgana", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Morgana_0.jpg" },
    { name: "Nami", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nami_0.jpg" },
    { name: "Nasus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nasus_0.jpg" },
    { name: "Nautilus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nautilus_0.jpg" },
    { name: "Neeko", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Neeko_0.jpg" },
    { name: "Nidalee", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nidalee_0.jpg" },
    { name: "Nocturne", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nocturne_0.jpg" },
    { name: "Nunu & Willump", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nunu_0.jpg" },
    { name: "Olaf", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Olaf_0.jpg" },
    { name: "Orianna", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Orianna_0.jpg" },
    { name: "Ornn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ornn_0.jpg" },
    { name: "Pantheon", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pantheon_0.jpg" },
    { name: "Poppy", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Poppy_0.jpg" },
    { name: "Pyke", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg" },
    { name: "Qiyana", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Qiyana_0.jpg" },
    { name: "Quinn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Quinn_0.jpg" },
    { name: "Rakan", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rakan_0.jpg" },
    { name: "Rammus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rammus_0.jpg" },
    { name: "Rek'Sai", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/RekSai_0.jpg" },
    { name: "Rell", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rell_0.jpg" },
    { name: "Renekton", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renekton_0.jpg" },
    { name: "Rengar", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_0.jpg" },
    { name: "Riven", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Riven_0.jpg" },
    { name: "Rumble", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rumble_0.jpg" },
    { name: "Ryze", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ryze_0.jpg" },
    { name: "Samira", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Samira_0.jpg" },
    { name: "Sejuani", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sejuani_0.jpg" },
    { name: "Senna", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Senna_0.jpg" },
    { name: "Seraphine", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Seraphine_0.jpg" },
    { name: "Sett", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_0.jpg" },
    { name: "Shaco", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shaco_0.jpg" },
    { name: "Shen", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shen_0.jpg" },
    { name: "Shyvana", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shyvana_0.jpg" },
    { name: "Singed", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Singed_0.jpg" },
    { name: "Sion", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sion_0.jpg" },
    { name: "Sivir", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sivir_0.jpg" },
    { name: "Skarner", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Skarner_0.jpg" },
    { name: "Sona", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sona_0.jpg" },
    { name: "Soraka", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Soraka_0.jpg" },
    { name: "Swain", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Swain_0.jpg" },
    { name: "Sylas", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sylas_0.jpg" },
    { name: "Syndra", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Syndra_0.jpg" },
    { name: "Tahm Kench", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TahmKench_0.jpg" },
    { name: "Taliyah", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taliyah_0.jpg" },
    { name: "Talon", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Talon_0.jpg" },
    { name: "Taric", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taric_0.jpg" },
    { name: "Teemo", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg" },
    { name: "Thresh", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg" },
    { name: "Tristana", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Tristana_0.jpg" },
    { name: "Trundle", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Trundle_0.jpg" },
    { name: "Tryndamere", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Tryndamere_0.jpg" },
    { name: "Twisted Fate", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TwistedFate_0.jpg" },
    { name: "Twitch", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Twitch_0.jpg" },
    { name: "Udyr", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Udyr_0.jpg" },
    { name: "Urgot", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Urgot_0.jpg" },
    { name: "Varus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Varus_0.jpg" },
    { name: "Vayne", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_0.jpg" },
    { name: "Veigar", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Veigar_0.jpg" },
    { name: "Vel'Koz", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Velkoz_0.jpg" },
    { name: "Vi", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vi_0.jpg" },
    { name: "Viego", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Viego_0.jpg" },
    { name: "Viktor", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Viktor_0.jpg" },
    { name: "Vladimir", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vladimir_0.jpg" },
    { name: "Volibear", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Volibear_0.jpg" },
    { name: "Warwick", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Warwick_0.jpg" },
    { name: "Wukong", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MonkeyKing_0.jpg" },
    { name: "Xayah", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Xayah_0.jpg" },
    { name: "Xerath", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Xerath_0.jpg" },
    { name: "Xin Zhao", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/XinZhao_0.jpg" },
    { name: "Yasuo", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg" },
    { name: "Yone", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yone_0.jpg" },
    { name: "Yuumi", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yuumi_0.jpg" },
    { name: "Zac", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zac_0.jpg" },
    { name: "Zed", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg" },
    { name: "Ziggs", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ziggs_0.jpg" },
    { name: "Zilean", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zilean_0.jpg" },
    { name: "Zoe", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zoe_0.jpg" },
    { name: "Zyra", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zyra_0.jpg" },

  ]

  online_statuses = []
  4.times { online_statuses << "Online" }
  7.times { online_statuses << "Invisible" }
  2.times { online_statuses << "Idle" }
  1.times { online_statuses << "Do Not Disturb" }

  champions.each do |champion|
    sanitized_name = champion[:name].downcase.gsub(/[^a-z0-9]/, "")
    email = "#{sanitized_name}@lol.com"

    # Ensure email length is within the valid range
    if email.length >= 3 && email.length <= 255
      user = User.new(
        username: champion[:name],
        email: email,
        password_digest: BCrypt::Password.create("password123"), # Placeholder password
        session_token: SecureRandom::urlsafe_base64,
        profile_picture_url: champion[:img_url]
      )

      # Attempt to save the user, and if it fails due to uniqueness, log an error
      unless user.save
        puts "Error saving user with email #{email}: #{user.errors.full_messages.join(", ")}"
      end
    else
      puts "Email #{email} is out of valid length range."
    end
  end

  puts "Creating servers..."
  # Piltover & Zaun
  server = Server.create!(
    name: "Piltover & Zaun Innovators",
    owner_id: User.find_by(email: "Aatrox@lol.com".downcase).id,
    private: false,
    server_photo_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vi_0.jpg",
  )

  ["Aatrox@lol.com", "akali@lol.com", "ahri@lol.com"].each do |champion_email|
    user = User.find_by(email: champion_email.downcase)
    if user.nil?
      puts "User with email #{champion_email} not found"
      next
    end

    unless Membership.exists?(server_id: server.id, member_id: user.id)
      Membership.create!(server_id: server.id, member_id: user.id)
    end
  end

  # Shadow Isles
  server = Server.create!(
    name: "Shadow Isles Specters",
    owner_id: User.find_by(email: "thresh@lol.com".downcase).id,
    private: false,
    server_photo_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg",
  )

  ["zilean@lol.com", "thresh@lol.com", "hecarim@lol.com"].each do |champion_email|
    user = User.find_by(email: champion_email.downcase)

    if user.nil?
      puts "User with email #{champion_email} not found"
      next
    end
    unless Membership.exists?(server_id: server.id, member_id: user.id)
      Membership.create!(server_id: server.id, member_id: user.id)
    end
  end

  # Ionia
  server = Server.create!(
    name: "Ionian Harmony",
    owner_id: User.find_by(email: "yasuo@lol.com".downcase).id,
    private: false,
    server_photo_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
  )

  ["yasuo@lol.com", "irelia@lol.com", "akali@lol.com"].each do |champion_email|
    user = User.find_by(email: champion_email.downcase)
    if user.nil?
      puts "User with email #{champion_email} not found"
      next
    end
    unless Membership.exists?(server_id: server.id, member_id: user.id)
      Membership.create!(server_id: server.id, member_id: user.id)
    end
  end

  # Targon
  server = Server.create!(
    name: "Targon's Peak",
    owner_id: User.find_by(email: "pantheon@lol.com".downcase).id,
    private: false,
    server_photo_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pantheon_0.jpg",
  )

  ["pantheon@lol.com", "leona@lol.com", "aurelionsol@lol.com"].each do |champion_email|
    user = User.find_by(email: champion_email.downcase)

    if user.nil?
      puts "User with email #{champion_email} not found"
      next
    end
    unless Membership.exists?(server_id: server.id, member_id: user.id)
      Membership.create!(server_id: server.id, member_id: user.id)
    end
  end

  # Shurima
  server = Server.create!(
    name: "Shurima's Sun Disc",
    owner_id: User.find_by(email: "azir@lol.com".downcase).id,
    private: false,
    server_photo_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg",
  )

  ["azir@lol.com", "nasus@lol.com", "sivir@lol.com"].each do |champion_email|
    user = User.find_by(email: champion_email.downcase)
    if user.nil?
      puts "User with email #{champion_email} not found"
      next
    end
    unless Membership.exists?(server_id: server.id, member_id: user.id)
      Membership.create!(server_id: server.id, member_id: user.id)
    end
  end

  # Bilgewater
  server = Server.create!(
    name: "Bilgewater Buccaneers",
    owner_id: User.find_by(email: "gangplank@lol.com".downcase).id,
    private: false,
    server_photo_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg",
  )

  ["gangplank@lol.com", "missfortune@lol.com", "tahmkench@lol.com"].each do |champion_email|
    user = User.find_by(email: champion_email.downcase)
    if user.nil?
      puts "User with email #{champion_email} not found"
      next
    end
    unless Membership.exists?(server_id: server.id, member_id: user.id)
      Membership.create!(server_id: server.id, member_id: user.id)
    end
  end

  puts "Creating channels..."

  # ... Piltover & Zaun
  server = Server.find_by(name: "Piltover & Zaun Innovators")
  Channel.create!(name: "General Chat", server_id: server.id)
  Channel.create!(name: "Inventions Chat", server_id: server.id)

  # ... Shadow Isles
  server = Server.find_by(name: "Shadow Isles Specters")
  Channel.create!(name: "General Chat", server_id: server.id)
  Channel.create!(name: "Haunting Stories", server_id: server.id)

  # ... Ionia
  server = Server.find_by(name: "Ionian Harmony")
  Channel.create!(name: "General Chat", server_id: server.id)
  Channel.create!(name: "Meditation Room", server_id: server.id)

  # ... Targon
  server = Server.find_by(name: "Targon's Peak")
  Channel.create!(name: "General Chat", server_id: server.id)
  Channel.create!(name: "Star Gazing", server_id: server.id)

  # ... Shurima
  server = Server.find_by(name: "Shurima's Sun Disc")
  Channel.create!(name: "General Chat", server_id: server.id)
  Channel.create!(name: "Desert Adventures", server_id: server.id)

  # ... Bilgewater
  server = Server.find_by(name: "Bilgewater Buccaneers")
  Channel.create!(name: "General Chat", server_id: server.id)
  Channel.create!(name: "Sea Tales", server_id: server.id)

  #   # You can continue this pattern for other servers if you have more.

  puts "Creating friendships..."

  # Extended friendships based on lore
  friendships = [

    ["yasuo@lol.com", "ahri@lol.com"],
    ["garen@lol.com", "lux@lol.com"],
    ["kayle@lol.com", "morgana@lol.com"],
    ["xayah@lol.com", "rakan@lol.com"],
    ["braum@lol.com", "lissandra@lol.com"],

    ["ashe@lol.com", "tryndamere@lol.com"],
    ["ashe@lol.com", "sejuani@lol.com"],

    ["jinx@lol.com", "vi@lol.com"],

    ["katarina@lol.com", "cassiopeia@lol.com"],

    ["nasus@lol.com", "renekton@lol.com"],

    ["senna@lol.com", "lucian@lol.com"],

    ["leona@lol.com", "diana@lol.com"],

    ["missfortune@lol.com", "sarah@lol.com"],

  ]

  friendships.each do |champion1_email, champion2_email|
    champion1 = User.find_by(email: champion1_email)
    champion2 = User.find_by(email: champion2_email)

    if champion1.nil? || champion2.nil?
      puts "One of the champions (#{champion1_email} or #{champion2_email}) not found."
      next
    end

    # Create friendship from champion1 to champion2
    unless Friend.exists?(user1_id: champion1.id, user2_id: champion2.id)
      Friend.create!(user1_id: champion1.id, user2_id: champion2.id)
    end

  end

  puts "Friendships created!"

  puts "Done!"
end
