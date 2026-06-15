#include "tinyxml2.h"

using namespace tinyxml2;

int main(int argc, char **argv)
{
    if (argc < 2)
        return 0;

    XMLDocument doc;
    doc.LoadFile(argv[1]);

    return 0;
}
