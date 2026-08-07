import { ChannelType } from "discord.js";
import { findGuild } from "./client.js";

export async function createChannel(opts: {
  server?: string;
  name: string;
  type?: "text" | "voice" | "category";
  fallbackGuildId?: string;
}) {
  const guild = await findGuild(opts.server, opts.fallbackGuildId);

  const typeMap = {
    text: ChannelType.GuildText,
    voice: ChannelType.GuildVoice,
    category: ChannelType.GuildCategory,
  } as const;

  const channel = await guild.channels.create({
    name: opts.name,
    type: typeMap[opts.type ?? "text"],
  });

  return {
    id: channel.id,
    name: channel.name,
    type: ChannelType[channel.type],
  };
}