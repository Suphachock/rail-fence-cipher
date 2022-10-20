def fence_pattern(rails, message_size):
    r = 2 * (rails - 1)
    return sorted(((z % r) if (z % r) < rails else r - (z % r), z) for z in range(message_size))


def encode(msg, rails):
    return ''.join(msg[i] for _, i in fence_pattern(rails, len(msg)))


# def decode(msg, rails):
#     xx = zip(fence_pattern(rails, len(msg)), msg)
#     return ''.join(ch for _, ch in sorted(xx, key=lambda i: i[0][1]))


print(encode("Nothingisasitseems", 3))
